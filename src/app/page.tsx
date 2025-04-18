"use client";

import { messagingApi } from "@line/bot-sdk";
import Image from "next/image";
export default function Home() {
  const pmr: messagingApi.PushMessageRequest = {
    to: "C218c440819754deed51e33f28883b0b5",
    messages: [{ type: "text", text: "Hello" }],
  };
  const handleClick = async () => {
    try {
      const response = await fetch("/api/line/message/push", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pmr),
      });

      if (response.ok) {
        console.log("Message pushed successfully!");
      } else {
        console.error("Failed to push message", await response.json());
      }
    } catch (error) {
      console.error("Error pushing message:", error);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ul className="text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">Line Messaging API Demo</li>
        </ul>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            onClick={handleClick}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            Say Hello
          </button>
        </div>
      </main>
    </div>
  );
}
