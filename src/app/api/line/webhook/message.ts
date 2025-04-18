import { messagingApi, MessageEvent, TextEventMessage } from "@line/bot-sdk";

export type ReplyRule = {
  id: string;
  keyword: string;
  response: string;
};

export let replyRules: ReplyRule[] = [
  {
    id: "1",
    keyword: "hello",
    response: "hi",
  },
];

export const setReplyRules = (newReplyRules: ReplyRule[]) => {
  replyRules = newReplyRules;
};

export const handleMessage = async (event: MessageEvent) => {
  const client = new messagingApi.MessagingApiClient({
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || "",
  });
  console.log(event);
  switch (event.message.type) {
    case "text":
      const textEventMessage: TextEventMessage = event.message;
      const replyRule: ReplyRule | undefined = replyRules.find((rule) =>
        textEventMessage.text.toLowerCase().includes(rule.keyword.toLowerCase())
      );
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
