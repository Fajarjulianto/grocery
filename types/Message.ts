/**
 * Describes the core properties of a single message entity
 * as received from the API.
 */
type ApiMessageDetail = {
  id: number;
  isSender: boolean;
  user1_id: string;
  user2_id: string;
  created_at: string;
  updated_at: string;
  message: string;
};

/**
 * Represents a message within a conversation,
 * including context about who sent it.
 */
type Message = {
  rest: ApiMessageDetail;
};

type Chat = {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
  conversation_id: string;
};

/**
 * Represents a single conversation thread
 * as received from the API.
 */
type Conversation = {
  id: number;
  messages: Message[];
};

export type { Conversation, Message, ApiMessageDetail, Chat };
