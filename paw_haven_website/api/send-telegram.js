export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) {
    return res.status(500).json({ error: "Telegram is not configured yet. Please contact the clinic." });
  }

  const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";
  if (!message || message.length > 3900) {
    return res.status(400).json({ error: "Invalid appointment details." });
  }

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message })
    });
    const data = await telegramResponse.json();
    if (!telegramResponse.ok || !data.ok) {
      console.error("Telegram API error:", data.description || "Unknown error");
      return res.status(502).json({ error: "The clinic's Telegram message could not be delivered. Please try again." });
    }
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Telegram request failed:", error);
    return res.status(502).json({ error: "Could not contact Telegram. Please try again." });
  }
}
