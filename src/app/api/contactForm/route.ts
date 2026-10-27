import { NextResponse } from "next/server";
import { z } from "zod";

import { contactEmail } from "@/lib/site";
import { createTransport, escapeHtml } from "@/lib/mail";

export const runtime = "nodejs";

// Server-side validation schema
const emailSchema = z.object({
  sender: z.object({
    name: z.string().min(2).max(200),
    address: z.email(),
  }),
  subject: z.string().min(3).max(300),
  message: z.string().min(10).max(5000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = emailSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid payload", details: z.treeifyError(parsed.error) },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const mail = createTransport();
    if (!mail) {
      return NextResponse.json(
        { ok: false, error: "SMTP credentials not configured on server." },
        { status: 500 }
      );
    }
    const { transporter, user } = mail;

    // 1) Send mail to the team inbox. The recipient is fixed on the server
    // so this endpoint can't be used to send mail to arbitrary addresses.
    const info = await transporter.sendMail({
      from: { name: data.sender.name, address: user },
      to: contactEmail,
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
      from: { name: "SILENT HAVOC", address: user },
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
