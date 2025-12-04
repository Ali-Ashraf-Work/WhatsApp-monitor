export interface MessagesResponse {
  success: boolean
  data: Data
  message: string
  pagination: Pagination
}

export interface Conversation {
  id: string
  name: string
  phone: string
  unreadCount: number
  timestamp: string
  lastMessage: LastMessage
  profilePic: string
}

export interface Data {
  messages: Message[]
}

export interface Pagination {
  nextCursor: string
  hasMore: boolean
  limit: number
}

export interface LastMessage {
  type: string
  content: string
  timestamp: string
  status: number
}

export interface Message {
  id: string;
  conversationId: string;
  whatsAppNumberId: string;
  direction: string;
  waMessageId: string;
  type: string;
  content: string;
  mediaUrl?: string;
  fileName?: string;
  caption: string;
  timestamp: string;
  senderPhone: string;
  senderName: string;
  createdAt: string;
  updatedAt: string;
  fromMe: boolean;
  status?: string;
}
export interface Agent {
  id: string;
  displayName: string;
  phoneNumber: string;
  isConnected: boolean;
  isActive: boolean;
  lastSyncedAt: string;
  createdAt: string;
  updatedAt: string;
  _count: Count;
}

export interface Count {
  conversations: number;
  messages: number;
}

export interface ContactCredentials {
  displayName: string;
}

export interface WhatsappQRCodeResponse {
  displayName: string;
  qrCode: string;
  whatsappNumberId: string;
}