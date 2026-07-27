import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "hello@maisonvela.com";

  if (resendKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Maison Vela Website <no-reply@maisonvela.com>",
        to: toEmail,
        reply_to: email,
        subject: `[Contact] ${subject ?? "New enquiry"} — ${name}`,
        text: `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`,
      }),
    });

    if (!res.ok) {
      console.error("Resend send failed", await res.text());
      return NextResponse.json({ error: "Email failed to send" }, { status: 502 });
    }
  } else {
    console.log("[contact] submission (Resend not configured):", { name, email, subject, message });
  }

  return NextResponse.json({ ok: true });
}
