export type FollowEvent = {
  type: "follow";
  replyToken: string;
  source: {
    userId: string;
    type: string;
  };
  timestamp: number;
};
export async function handleFollow(event: FollowEvent) {
  const userId = event.source.userId;
  console.log(`User followed: ${userId}`);
}
