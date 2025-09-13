export interface Conversation {
  customerId: string;
  customerName: string;
  customerAvatarUrl: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface Message {
  id: string;
  sender: "admin" | "customer"; // Menentukan pengirim
  text: string;
  timestamp: string;
}
