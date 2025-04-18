import { NextRequest, NextResponse } from "next/server";
import { messagingApi } from "@line/bot-sdk";

const client = new messagingApi.MessagingApiClient({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || "",
});

export async function POST(request: NextRequest) {
  console.log("boradcasting");
  try {
    const broadcastRequest =
      (await request.json()) as messagingApi.BroadcastRequest;

    //todo data validation (zod)

    await client.broadcast(broadcastRequest);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error broadcasting message:", error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
