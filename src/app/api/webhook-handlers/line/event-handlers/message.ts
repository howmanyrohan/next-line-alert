import { messagingApi, MessageEvent, TextEventMessage } from "@line/bot-sdk";

export const handleMessage = async (event: MessageEvent) => {
  const client = new messagingApi.MessagingApiClient({
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || "",
  });
  console.log(event);
  switch (event.message.type) {
    case "text":
      client.replyMessage({
        replyToken: event.replyToken,
        messages: [
          {
            type: event.message.type,
            text: (event.message as TextEventMessage).text,
          },
        ],
      });
      break;
    default:
      console.log(`Unhandled event message type: ${event.type}`);
  }
};
