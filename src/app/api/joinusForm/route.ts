import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

export const runtime = "nodejs";

const emailSchema = z.object({
  sender: z.object({ name: z.string().min(2), address: z.string().email() }),
  recipients: z.array(z.object({ address: z.string().email() })).min(1),
  subject: z.string().min(3),
  message: z.string().min(10),
});

type EmailBody = z.infer<typeof emailSchema>;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = emailSchema.safeParse(body);
    if (!parsed.success)
      return NextResponse.json(
        { ok: false, error: "Invalid payload", details: parsed.error.format() },
        { status: 400 }
      );

    const data: EmailBody = parsed.data;

    const {
      SMTP_HOST = "smtp.gmail.com",
      SMTP_PORT = "465",
      SMTP_USER,
      SMTP_PASS,
    } = process.env;
    if (!SMTP_USER || !SMTP_PASS)
      return NextResponse.json(
        { ok: false, error: "SMTP not configured." },
        { status: 500 }
      );

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT, 10),
      secure: true,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const to = data.recipients.map((r) => r.address).join(",");

    // Send mail to owner
    await transporter.sendMail({
      from: `"${data.sender.name}" <${SMTP_USER}>`,
      to,
      subject: data.subject,
      text: data.message,
      html: `<pre style="white-space:pre-wrap">${data.message}</pre><hr/><p>From: ${data.sender.name} &lt;${data.sender.address}&gt;</p>`,
      replyTo: data.sender.address,
    });

    // Auto-reply
    await transporter.sendMail({
      from: `"SILENT HAVOC" <${SMTP_USER}>`,
      to: data.sender.address,
      subject: `Mesajınızı Aldık / We received your message: ${data.subject}`,
      text: `[TR] 
      Merhaba ${data.sender.name}, 
      Bizimle iletişime geçtiğiniz için teşekkür ederiz. Başvurunuzu aldık ve en kısa sürede size dönüş yapacağız.

      [ENG] 
      Hello ${data.sender.name}, 
      Thank you for reaching out. We received your application and will respond as soon as possible.`,
      html: `<p>[TR] 
      Merhaba ${data.sender.name}, 
      Bizimle iletişime geçtiğiniz için teşekkür ederiz. Başvurunuzu aldık ve en kısa sürede size dönüş yapacağız.</p>
      <hr/>
      <p>[ENG] 
      Hello ${data.sender.name}, 
      Thank you for reaching out. We received your application and will respond as soon as possible.</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
