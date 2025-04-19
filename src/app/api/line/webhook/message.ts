import {
  messagingApi,
  type MessageEvent,
  type TextEventMessage,
} from "@line/bot-sdk";
import { findMatchingRule } from "@/lib/reply-rules";

export const handleMessage = async (event: MessageEvent) => {
  const client = new messagingApi.MessagingApiClient({
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || "",
  });

  console.log(event);

  switch (event.message.type) {
    case "text":
      const textEventMessage: TextEventMessage = event.message;
      const replyRule = findMatchingRule(textEventMessage.text);

      client.replyMessage({
        replyToken: event.replyToken,
        messages: [
          {
            type: event.message.type,
            text: replyRule ? replyRule.response : "response not found",
          },
        ],
      });
      break;
    default:
      console.log(`Unhandled event message type: ${event.type}`);
  }
};
