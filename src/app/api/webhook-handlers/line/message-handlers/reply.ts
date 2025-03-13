const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;

export const sendReply = async (replyToken: string, message: string) => {
  if (!channelAccessToken) {
    console.error("LINE_CHANNEL_ACCESS_TOKEN is not set.");
    return;
  }
  try {
    const response = await fetch("https://api.line.me/v2/bot/message/reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${channelAccessToken}`,
      },
      body: JSON.stringify({
        replyToken: replyToken,
        messages: [{ type: "text", text: message }],
      }),
    });

    if (!response.ok) {
      console.error("Failed to send reply:", await response.json());
    }
  } catch (error) {
    console.error("Error sending reply:", error);
  }
};
