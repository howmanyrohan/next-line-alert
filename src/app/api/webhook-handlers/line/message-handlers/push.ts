const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;

export const sendPush = async (message: string) => {
  if (!channelAccessToken) {
    console.error("LINE_CHANNEL_ACCESS_TOKEN is not set.");
    return;
  }
  try {
    const response = await fetch("https://api.line.me/v2/bot/message/push", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${channelAccessToken}`,
      },
      body: JSON.stringify({
        to: "Ud820e7b43977b7e3a710133ed3650fcc",
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
