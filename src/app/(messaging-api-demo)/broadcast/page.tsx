"use client";

import type React from "react";

import { useState } from "react";
import { PinIcon as BroadcastPin } from "lucide-react";
import { messagingApi } from "@line/bot-sdk";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function BroadcastPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      toast("Error", {
        description: "Please enter a message",
      });
      return;
    }

    setLoading(true);

    try {
      const broadcastRequest: messagingApi.BroadcastRequest = {
        messages: [{ type: "text", text: message }],
      };
      await fetch("/api/line/message/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(broadcastRequest),
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast("Success", {
        description: "Broadcast message sent successfully",
      });

      // Clear form
      setMessage("");
    } catch (error) {
      toast("Error", {
        description: `Failed to send broadcast message \n ${error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Broadcast Message</h1>
      <Card>
        <CardHeader>
          <CardTitle>Send Broadcast Message</CardTitle>
          <CardDescription>
            Send a message to all users who have added your Line Official
            Account as a friend
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Type your broadcast message here"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Broadcasting...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <BroadcastPin className="h-4 w-4" />
                  Send Broadcast Message
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
