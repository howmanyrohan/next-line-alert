import { type NextRequest, NextResponse } from "next/server";
import {
  validateSignature,
  type WebhookRequestBody,
  type MessageEvent,
  type FollowEvent,
} from "@line/bot-sdk";

import { handleMessage } from "@/app/api/line/webhook/message";
import { handleFollow } from "@/app/api/line/webhook/follow";

// Mark this file as server-only
export const runtime = "nodejs"; // This ensures it runs in a Node.js environment

const config = {
  channelSecret: process.env.CHANNEL_SECRET || "",
};

export async function POST(request: NextRequest) {
  try {
    const text = await request.text();

    // Validate webhook signature
    if (
      !validateSignature(
        text,
        config.channelSecret,
        request.headers.get("x-line-signature") || ""
      )
    ) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const body = JSON.parse(text) as WebhookRequestBody;
    console.log("Received webhook:", body);

    if (body.events && body.events.length > 0) {
      for (const event of body.events) {
        switch (event.type) {
          case "message":
            await handleMessage(event as MessageEvent);
            break;
          case "follow":
            await handleFollow(event as FollowEvent);
            break;
          default:
            console.log(`Unhandled event type: ${event.type}`);
        }
      }
    }
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
