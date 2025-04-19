// This file contains type definitions from @line/bot-sdk that can be used in client components
export type TextMessage = {
  type: "text";
  text: string;
};

export type BroadcastRequest = {
  messages: TextMessage[];
};

export type PushMessageRequest = {
  to: string;
  messages: TextMessage[];
};
