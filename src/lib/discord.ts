type DiscordEmbed = {
  color?: number;
  title?: string;
  description?: string;
};

export type DiscordWebhookPayload = {
  embeds?: DiscordEmbed[];
};

export async function sendDiscordWebhook(webhookUrl: string, payload: DiscordWebhookPayload) {
  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Webhook request failed: ${res.status} ${text}`);
  }
}
