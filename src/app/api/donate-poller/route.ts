import { NextResponse } from "next/server";
import Papa from "papaparse";
import { getRedisClient } from "@/lib/redis";
import { sendDiscordWebhook } from "@/lib/discord";

const DEFAULT_SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSEAUBRs8RmNLMlelOmHJoc4369oJ3CDD8s27L5JKAM54hQ6r6aAFl-J0KYKrrVJWYKz2VOUo5ZLJ3s/pub?output=csv";

const STATE_KEY = process.env.DONATE_STATE_KEY || "donate:last_id";

const withCacheBuster = (url: string) =>
  url.includes("?") ? `${url}&t=${Date.now()}` : `${url}?t=${Date.now()}`;

const pickValue = (row: Record<string, unknown>, keys: string[]) => {
  for (const key of keys) {
    const value = row[key];
    if (value !== undefined && value !== null && String(value).trim()) {
      return String(value).trim();
    }
  }
  return "";
};

export async function GET() {
  const webhookUrl = process.env.DISCORD_DONATE_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { error: "DISCORD_DONATE_WEBHOOK_URL is not configured." },
      { status: 500 }
    );
  }

  const redis = getRedisClient();
  if (!redis) {
    return NextResponse.json(
      {
        error:
          "Redis is not configured. Set UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN (or KV_REST_API_URL + KV_REST_API_TOKEN).",
      },
      { status: 500 }
    );
  }

  const sheetUrl = process.env.DONATE_SHEET_CSV_URL || DEFAULT_SHEET_CSV_URL;

  try {
    const res = await fetch(withCacheBuster(sheetUrl), { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch Google Sheet.", status: res.status },
        { status: 502 }
      );
    }

    const csvText = await res.text();
    const parsed = Papa.parse<Record<string, unknown>>(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    if (!parsed.data.length) {
      return NextResponse.json({ ok: true, changed: false, reason: "empty" });
    }

    const newest = parsed.data[parsed.data.length - 1];
    const currentId =
      pickValue(newest, ["STT", "Dấu thời gian", "Timestamp"]) ||
      `${pickValue(newest, ["Tên", "Tên người gửi"])}|${pickValue(newest, ["Số tiền"])}|${pickValue(newest, ["Lời nhắn"])}`;

    if (!currentId) {
      return NextResponse.json({ ok: true, changed: false, reason: "no_id" });
    }

    const lastId = await redis.get<string>(STATE_KEY);
    if (!lastId) {
      await redis.set(STATE_KEY, currentId);
      return NextResponse.json({
        ok: true,
        changed: false,
        initialized: true,
        currentId,
      });
    }

    if (lastId === currentId) {
      return NextResponse.json({ ok: true, changed: false, currentId });
    }

    const name = pickValue(newest, ["Tên", "Tên người gửi"]) || "Ẩn danh";
    const amountValue = pickValue(newest, ["Số tiền"]) || "0";
    const messageValue = pickValue(newest, ["Lời nhắn"]);
    const timeValue = pickValue(newest, ["Dấu thời gian", "Timestamp"]);

    const details = [
      `Tên: ${name}`,
      `Số tiền: ${amountValue}`,
      messageValue ? `Lời nhắn: ${messageValue}` : "Lời nhắn: (trống)",
      timeValue ? `Thời gian: ${timeValue}` : "Thời gian: (không rõ)",
    ].join("\n");

    await sendDiscordWebhook(webhookUrl, {
      embeds: [
        {
          color: 0x57f287,
          title: "Donate mới từ Google Sheet",
          description: ["Có donate mới cập nhật.", details].join("\n"),
        },
      ],
    });

    await redis.set(STATE_KEY, currentId);

    return NextResponse.json({ ok: true, changed: true, currentId });
  } catch (error) {
    const detailsText = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Poller failed.", details: detailsText },
      { status: 500 }
    );
  }
}
