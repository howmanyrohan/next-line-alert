import { NextRequest, NextResponse } from "next/server";
import { messagingApi } from "@line/bot-sdk";

const client = new messagingApi.MessagingApiClient({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || "",
});

export async function POST(request: NextRequest) {
  try {
    const pushMessageRequest =
      (await request.json()) as messagingApi.PushMessageRequest;

    //todo data validation (zod)

    await client.pushMessage(pushMessageRequest);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error pushing message:", error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
