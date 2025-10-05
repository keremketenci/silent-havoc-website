import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { ok: false, error: "Email is required." },
        { status: 400 }
      );
    }

    const {
      SMTP_HOST = "smtp.gmail.com",
      SMTP_PORT = "465",
      SMTP_USER,
      SMTP_PASS,
    } = process.env;

    if (!SMTP_USER || !SMTP_PASS) {
      return NextResponse.json(
        { ok: false, error: "SMTP not configured." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT, 10),
      secure: true,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    // 1) Mail to site owner
    await transporter.sendMail({
      from: `"Subscribe Form" <${SMTP_USER}>`,
      to: "silent.havoc.istanbul@gmail.com",
      subject: "New Subscription",
      text: `New subscriber: ${email}`,
      html: `<p>New subscriber: ${email}</p>`,
    });

    // 2) Auto-reply to subscriber
    await transporter.sendMail({
      from: `"Your Company" <${SMTP_USER}>`,
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
