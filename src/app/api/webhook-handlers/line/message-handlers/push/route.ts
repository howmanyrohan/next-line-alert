import { NextResponse } from "next/server";
import { messagingApi } from "@line/bot-sdk";

const client = new messagingApi.MessagingApiClient({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || "",
});

export async function POST(request: Request) {
  try {
    const pmr = (await request.json()) as messagingApi.PushMessageRequest;

    if (pmr.to) {
      await client.pushMessage(pmr);
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: "userId is required" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error pushing message to group:", error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
