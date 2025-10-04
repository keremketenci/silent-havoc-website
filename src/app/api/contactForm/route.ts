import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

export const runtime = "nodejs";

// Server-side validation schema
const emailSchema = z.object({
  sender: z.object({
    name: z.string().min(2),
    address: z.string().email(),
  }),
  recipients: z.array(z.object({ address: z.string().email() })).min(1),
  subject: z.string().min(3),
  message: z.string().min(10),
});

type EmailBody = z.infer<typeof emailSchema>;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = emailSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid payload", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const data: EmailBody = parsed.data;

    // Read SMTP config from environment
    const {
      SMTP_HOST = "smtp.gmail.com",
      SMTP_PORT = "465",
      SMTP_USER,
      SMTP_PASS,
    } = process.env;

    if (!SMTP_USER || !SMTP_PASS) {
      return NextResponse.json(
        { ok: false, error: "SMTP credentials not configured on server." },
        { status: 500 }
      );
    }

    // create transporter
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT, 10),
      secure: true,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const to = data.recipients.map((r) => r.address).join(", ");

    // 1) Send mail to your customer (main recipient)
    const info = await transporter.sendMail({
      from: `"${data.sender.name}" <${SMTP_USER}>`,
      to,
      subject: data.subject,
      text: data.message,
      html: `<pre style="white-space:pre-wrap">${escapeHtml(data.message)}</pre>
             <hr/>
             <p><strong>From:</strong> ${escapeHtml(
               data.sender.name
             )} &lt;${escapeHtml(data.sender.address)}&gt;</p>`,
      replyTo: data.sender.address,
    });

    // 2) Send auto-reply back to the form sender
    await transporter.sendMail({
      from: `"SILENT HAVOC" <${SMTP_USER}>`,
      to: data.sender.address,
      subject: `Mesajınızı Aldık / We received your message: ${data.subject}`,
      text: `[TR]  
      Merhaba ${data.sender.name},

      Bizimle iletişime geçtiğiniz için teşekkür ederiz. Mesajınızı aldık ve en kısa sürede size dönüş yapacağız.

      Saygılarımızla,  
      SILENT HAVOC

      ----------------------------------

      [ENG]  
      Hello ${data.sender.name},

      Thank you for reaching out. We received your message and will respond as soon as possible.

      Best regards,  
      SILENT HAVOC`,
      html: `
    <p><strong>[TR]</strong></p>
    <p>Merhaba ${escapeHtml(data.sender.name)},</p>
    <p>Bizimle iletişime geçtiğiniz için teşekkür ederiz. Mesajınızı aldık ve en kısa sürede size dönüş yapacağız.</p>
    <p>Saygılarımızla,<br/>SILENT HAVOC</p>

    <hr style="margin: 20px 0; border: none; border-top: 1px solid #ccc;" />

    <p><strong>[ENG]</strong></p>
    <p>Hello ${escapeHtml(data.sender.name)},</p>
    <p>Thank you for reaching out. We received your message and will respond as soon as possible.</p>
    <p>Best regards,<br/>SILENT HAVOC</p>
  `,
    });

    return NextResponse.json(
      { ok: true, messageId: info.messageId },
      { status: 200 }
    );
  } catch (err) {
    console.error("Email sending error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error sending email" },
      { status: 500 }
    );
  }
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
