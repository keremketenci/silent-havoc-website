import { NextResponse } from "next/server";
import { z } from "zod";

import { contactEmail } from "@/lib/site";
import { createTransport, escapeHtml } from "@/lib/mail";

export const runtime = "nodejs";

const emailSchema = z.object({
  sender: z.object({ name: z.string().min(2).max(200), address: z.email() }),
  subject: z.string().min(3).max(300),
  message: z.string().min(10).max(5000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = emailSchema.safeParse(body);
    if (!parsed.success)
      return NextResponse.json(
        { ok: false, error: "Invalid payload", details: z.treeifyError(parsed.error) },
        { status: 400 }
      );

    const data = parsed.data;

    const mail = createTransport();
    if (!mail)
      return NextResponse.json(
        { ok: false, error: "SMTP not configured." },
        { status: 500 }
      );
    const { transporter, user } = mail;

    const name = escapeHtml(data.sender.name);

    // Send mail to owner (recipient fixed on the server)
    await transporter.sendMail({
      from: { name: data.sender.name, address: user },
      to: contactEmail,
      subject: data.subject,
      text: data.message,
      html: `<pre style="white-space:pre-wrap">${escapeHtml(data.message)}</pre><hr/><p>From: ${name} &lt;${escapeHtml(data.sender.address)}&gt;</p>`,
      replyTo: data.sender.address,
    });

    // Auto-reply
    await transporter.sendMail({
      from: { name: "SILENT HAVOC", address: user },
      to: data.sender.address,
      subject: `Mesajınızı Aldık / We received your message: ${data.subject}`,
      text: `[TR]
Merhaba ${data.sender.name},
Bizimle iletişime geçtiğiniz için teşekkür ederiz. Başvurunuzu aldık ve en kısa sürede size dönüş yapacağız.

[ENG]
Hello ${data.sender.name},
Thank you for reaching out. We received your application and will respond as soon as possible.`,
      html: `<p>[TR]
      Merhaba ${name},
      Bizimle iletişime geçtiğiniz için teşekkür ederiz. Başvurunuzu aldık ve en kısa sürede size dönüş yapacağız.</p>
      <hr/>
      <p>[ENG]
      Hello ${name},
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
