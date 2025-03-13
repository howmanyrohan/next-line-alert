import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

import {
  MessageEvent,
  handleMessage,
} from "@/app/api/webhook-handlers/line/event-handlers/message";
import {
  FollowEvent,
  handleFollow,
} from "@/app/api/webhook-handlers/line/event-handlers/follow";

const channelSecret = process.env.LINE_CHANNEL_SECRET;

export async function POST(request: NextRequest) {
  if (!channelSecret) {
    console.error("LINE_CHANNEL_SECRET is not set.");
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
  try {
    const signature = request.headers.get("x-line-signature");
    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    const text = await request.text();
    const hash = crypto
      .createHmac("sha256", channelSecret)
      .update(text)
      .digest("base64");

    if (hash !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const body = JSON.parse(text);
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
