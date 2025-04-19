"use server";

import {
  getReplyRules,
  setReplyRules,
  addReplyRule,
  deleteReplyRule,
  type ReplyRule,
} from "@/lib/reply-rules";

export async function fetchReplyRules() {
  return getReplyRules();
}

export async function createReplyRule(rule: ReplyRule) {
  addReplyRule(rule);
  return { success: true };
}

export async function removeReplyRule(id: string) {
  deleteReplyRule(id);
  return { success: true };
}

export async function updateReplyRules(rules: ReplyRule[]) {
  setReplyRules(rules);
  return { success: true };
}
