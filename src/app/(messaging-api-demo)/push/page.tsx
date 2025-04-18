"use client";

import type React from "react";

import { useState } from "react";
import { Send } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function PushPage() {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId.trim() || !message.trim()) {
      toast("Error", {
        description: "Please fill in all fields",
      });
      return;
    }

    setLoading(true);

    try {
      const pmr: messagingApi.PushMessageRequest = {
        to: userId,
        messages: [{ type: "text", text: message }],
      };
      await fetch("/api/line/message/push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pmr),
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast("Success", {
        description: "Message sent successfully",
      });

      // Clear form
      setMessage("");
    } catch (error) {
      toast("Error", {
        description: `Failed to send message \n ${error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Push Message</h1>
      <Card>
        <CardHeader>
          <CardTitle>Send Push Message</CardTitle>
          <CardDescription>
            Send a direct message to a specific user by their User ID
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userId">User ID</Label>
              <Input
                id="userId"
                placeholder="Enter Line User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Type your message here"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Sending...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Send Push Message
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
