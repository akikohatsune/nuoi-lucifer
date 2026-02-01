import { NextResponse } from "next/server";
import { sendDiscordWebhook } from "@/lib/discord";

export async function POST(req: Request) {
  const webhookUrl = process.env.DISCORD_DONATE_WEBHOOK_URL;
  if (!webhookUrl) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[donate-webhook] DISCORD_DONATE_WEBHOOK_URL is not configured.");
      return NextResponse.json(
        { ok: false, skipped: true, reason: "missing_webhook_url" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { error: "DISCORD_DONATE_WEBHOOK_URL is not configured." },
      { status: 500 }
    );
  }

  let body: { title?: string; message?: string; details?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const title = (body.title || "").trim();
  const message = (body.message || "").trim();
  const details = (body.details || "").trim();

  if (!title && !message && !details) {
    return NextResponse.json({ error: "Empty payload." }, { status: 400 });
  }

  const description = [message, details].filter(Boolean).join("\n");

  try {
    await sendDiscordWebhook(webhookUrl, {
      embeds: [
        {
          color: 0x57f287,
          title: title || undefined,
          description: description || undefined,
        },
      ],
    });
  } catch (error) {
    const detailsText = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Webhook request failed.", details: detailsText },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
