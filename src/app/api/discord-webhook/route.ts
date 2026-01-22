import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[discord-webhook] DISCORD_WEBHOOK_URL is not configured.");
      return NextResponse.json(
        { ok: false, skipped: true, reason: "missing_webhook_url" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { error: "DISCORD_WEBHOOK_URL is not configured." },
      { status: 500 }
    );
  }

  let body: { title?: string; message?: string; details?: string; imageUrl?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const title = (body.title || "").trim();
  const message = (body.message || "").trim();
  const details = (body.details || "").trim();
  const imageUrl = typeof body.imageUrl === "string" ? body.imageUrl.trim() : "";

  if (!title && !message && !details && !imageUrl) {
    return NextResponse.json({ error: "Empty payload." }, { status: 400 });
  }

  const payload: {
    embeds?: Array<{
      title?: string;
      description?: string;
      image?: { url: string };
    }>;
  } = {};

  const embed: {
    title?: string;
    description?: string;
    image?: { url: string };
  } = {};

  if (title) embed.title = title;

  const description = [message, details].filter(Boolean).join("\n");
  if (description) embed.description = description;

  if (imageUrl) {
    embed.image = { url: imageUrl };
  }

  payload.embeds = [embed];

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json(
      { error: "Webhook request failed.", details: text },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
