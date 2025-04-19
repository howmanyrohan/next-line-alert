"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { MessageSquare, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import {
  fetchReplyRules,
  createReplyRule,
  removeReplyRule,
} from "@/app/actions/reply-rules";
import type { ReplyRule } from "@/lib/reply-rules";

export default function ReplyPage() {
  const [keyword, setKeyword] = useState("");
  const [response, setResponse] = useState("");
  const [rules, setRules] = useState<ReplyRule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRules = async () => {
      try {
        const fetchedRules = await fetchReplyRules();
        setRules(fetchedRules);
      } catch (error) {
        console.error(error);
        toast("Error", {
          description: "Failed to load reply rules",
        });
      } finally {
        setLoading(false);
      }
    };

    loadRules();
  }, []);

  const handleAddRule = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!keyword.trim() || !response.trim()) {
      toast("Error", {
        description: "Please fill in all fields",
      });
      return;
    }

    const newRule: ReplyRule = {
      id: Date.now().toString(),
      keyword: keyword.trim(),
      response: response.trim(),
    };

    try {
      await createReplyRule(newRule);
      setRules([...rules, newRule]);

      toast("Success", {
        description: "Reply rule added successfully",
      });

      setKeyword("");
      setResponse("");
    } catch (error) {
      console.error(error);
      toast("Error", {
        description: "Failed to add reply rule",
      });
    }
  };

  const handleDeleteRule = async (id: string) => {
    try {
      await removeReplyRule(id);
      setRules(rules.filter((rule) => rule.id !== id));

      toast("Success", {
        description: "Reply rule deleted successfully",
      });
    } catch (error) {
      console.error(error);
      toast("Error", {
        description: "Failed to delete reply rule",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Reply Messages</h1>

      {/* Add new reply rule */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Set Automatic Reply</CardTitle>
          <CardDescription>
            Create rules to automatically reply to specific keywords or phrases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddRule} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="keyword">When a message contains</Label>
              <Input
                id="keyword"
                placeholder="Enter keyword or phrase"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                The bot will reply when a user&apos;s message contains this text
                (case insensitive)
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="response">Reply with</Label>
              <Textarea
                id="response"
                placeholder="Type your automatic response here"
                rows={3}
                value={response}
                onChange={(e) => setResponse(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Reply Rule
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Existing reply rules */}
      <Card>
        <CardHeader>
          <CardTitle>Active Reply Rules</CardTitle>
          <CardDescription>
            Your bot will automatically respond to these keywords
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          ) : rules.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="rounded-full bg-muted p-4 mb-4">
                <MessageSquare className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No Reply Rules</h3>
              <p className="text-muted-foreground max-w-md">
                Add your first reply rule above to start automating responses.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {rules.map((rule, index) => (
                <div key={rule.id}>
                  {index > 0 && <Separator className="my-4" />}
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="font-medium">
                        When a message contains:
                      </div>
                      <div className="bg-muted p-2 rounded-md mt-1 mb-2">
                        &quot; {rule.keyword} &quot;
                      </div>
                      <div className="font-medium">Reply with:</div>
                      <div className="bg-muted p-2 rounded-md mt-1 whitespace-pre-wrap">
                        {rule.response}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDeleteRule(rule.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete rule</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
