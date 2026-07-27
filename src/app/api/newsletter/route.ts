import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const klaviyoKey = process.env.KLAVIYO_PRIVATE_KEY;
  const listId = process.env.KLAVIYO_LIST_ID;

  if (klaviyoKey && listId) {
    const res = await fetch(
      `https://a.klaviyo.com/api/lists/${listId}/relationships/profiles/`,
      {
        method: "POST",
        headers: {
          Authorization: `Klaviyo-API-Key ${klaviyoKey}`,
          "Content-Type": "application/json",
          revision: "2024-10-15",
        },
        body: JSON.stringify({
          data: [{ type: "profile", attributes: { email } }],
        }),
      }
    );

    if (!res.ok) {
      console.error("Klaviyo subscribe failed", await res.text());
      return NextResponse.json({ error: "Subscription failed" }, { status: 502 });
    }
  } else {
    // No Klaviyo credentials configured yet — log so submissions aren't lost silently.
    console.log(`[newsletter] subscribe request for ${email} (Klaviyo not configured)`);
  }

  return NextResponse.json({ ok: true });
}
