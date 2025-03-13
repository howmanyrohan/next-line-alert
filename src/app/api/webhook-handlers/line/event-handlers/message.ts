import { sendReply } from "@/app/api/webhook-handlers/line/message-handlers/reply";

export type MessageEvent = {
  type: "message";
  replyToken: string;
  source: {
    userId: string;
    type: string;
  };
  timestamp: number;
  message: {
    type: string;
    id: string;
    text: string;
  };
};

export async function handleMessage(event: MessageEvent) {
  if (event.message.type === "text") {
    const messageText = event.message.text;
    const replyToken = event.replyToken;

    console.log(`Received message: ${messageText}`);

    await sendReply(replyToken, `You said: ${messageText}`);
  }
}
