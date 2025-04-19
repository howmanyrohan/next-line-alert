import { messagingApi, type FollowEvent } from "@line/bot-sdk";

export async function handleFollow(event: FollowEvent) {
  const client = new messagingApi.MessagingApiClient({
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || "",
  });

  const userId = event.source.userId;
  console.log(`User followed: ${userId}`);

  client.pushMessage({
    to: userId || "",
    messages: [{ type: "text", text: `your user id is ${userId}` }],
  });
}
