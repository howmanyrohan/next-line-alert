export type ReplyRule = {
  id: string;
  keyword: string;
  response: string;
};

// Using a simple in-memory store for demo purposes
// In a real app, you'd use a database
let replyRules: ReplyRule[] = [
  {
    id: "1",
    keyword: "hello",
    response: "hi",
  },
];

export function getReplyRules(): ReplyRule[] {
  return [...replyRules];
}

export function setReplyRules(newRules: ReplyRule[]): void {
  replyRules = [...newRules];
}

export function addReplyRule(rule: ReplyRule): void {
  replyRules = [...replyRules, rule];
}

export function deleteReplyRule(id: string): void {
  replyRules = replyRules.filter((rule) => rule.id !== id);
}

export function findMatchingRule(message: string): ReplyRule | undefined {
  return replyRules.find((rule) =>
    message.toLowerCase().includes(rule.keyword.toLowerCase())
  );
}
