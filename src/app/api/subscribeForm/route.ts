import { NextResponse } from "next/server";
import { z } from "zod";

import { contactEmail } from "@/lib/site";
import { createTransport, escapeHtml } from "@/lib/mail";

export const runtime = "nodejs";

const subscribeSchema = z.object({ email: z.email() });

export async function POST(req: Request) {
  try {
    const parsed = subscribeSchema.safeParse(await req.json());

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "A valid email is required." },
        { status: 400 }
      );
    }

    const { email } = parsed.data;

    const mail = createTransport();
    if (!mail) {
      return NextResponse.json(
        { ok: false, error: "SMTP not configured." },
        { status: 500 }
      );
    }
    const { transporter, user } = mail;

    // 1) Mail to site owner
    await transporter.sendMail({
      from: { name: "Subscribe Form", address: user },
      to: contactEmail,
      subject: "New Subscription",
      text: `New subscriber: ${email}`,
      html: `<p>New subscriber: ${escapeHtml(email)}</p>`,
    });

    // 2) Auto-reply to subscriber
    await transporter.sendMail({
      from: { name: "SILENT HAVOC", address: user },
      to: email,
      subject: "Abone Oldunuz / You are subscribed",
      text: `[TR]
Merhaba,
Bültenimize başarıyla abone oldunuz. Teşekkür ederiz!

[ENG]
Hello,
You have successfully subscribed to our newsletter. Thank you!`,
      html: `
      <p><strong>[TR]</strong></p>
      <p>Merhaba,</p>
      <p>Bültenimize başarıyla abone oldunuz. Teşekkür ederiz!</p>

      <hr style="margin:20px 0;border:none;border-top:1px solid #ccc;" />

      <p><strong>[ENG]</strong></p>
      <p>Hello,</p>
      <p>You have successfully subscribed to our newsletter. Thank you!</p>
      `,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Subscription error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
