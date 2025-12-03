import Pagination from "../../../core/components/Pagination";
import type { Conversation } from "../types/chatTypes";
import { formatTime } from "../utils/helpers";
import ConversationListSkeleton from "./ConversationListSkeleton";
// import { formatTime } from "../utils/helpers";

export default function ConversationList({
  conversations,
  setActiveConversationId,
  activeConversationId,
  page,
  setPage,
  limit,
  total,
  isLoading,
}: {
  conversations: Conversation[];
  setActiveConversationId: (conversationId: string) => void;
  activeConversationId: string | null;
  page: number;
  setPage: (page: number) => void;
  limit: number;
  total: number;
  isLoading: boolean;
}) {
  return (
    <div className="flex flex-col h-screen bg-linear-to-tl from-white to-background-default">
      <div className="flex-1 overflow-y-auto p-3 shadow-inner border-s border-gray-100">
        {isLoading ? (
          <ConversationListSkeleton />
        ) : conversations?.map((conversation: Conversation) => (
          <div
            key={conversation.id}
            onClick={() => setActiveConversationId(conversation.id)}
            className={`flex items-start gap-3 cursor-pointer ${activeConversationId === conversation.id ? "bg-brand-primary-100" : "bg-white"} rounded p-3 mb-3 shadow-sm border border-gray-100`}
          >
            {/* Customer Avatar */}
            <div className="bg-linear-to-br from-green-400 to-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center shrink-0 font-bold text-lg shadow-md">
              {conversation.name?.[0]?.toUpperCase() ||
                conversation.phone[0]}
            </div>

            <div className="flex-1 min-w-0">
              {/* Customer Name & Time */}
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2 flex-1">
                  <p className="font-semibold text-gray-900 truncate">
                    {conversation.name || "Unknown Customer"}
                  </p>
                  {conversation.unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-medium animate-pulse">
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
              </div>

              {/* Customer Phone */}
              <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                {/* <User className="w-3 h-3" /> */}
                <span className="font-mono">{conversation.phone}</span>
              </div>

              {/* Last Message Preview */}
              <div className="flex items-center gap-1 text-sm text-gray-600 mb-2 italic truncate text-center">
                {/* "{conversation.lastMessage.content || "No messages yet"}" */}
                <span className="text-xs text-gray-400 shrink">{formatTime(conversation.lastMessage.timestamp)}:</span>
                <span className="">{conversation.lastMessage.content}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center px-3 py-2 border-t border-gray-100 ">
        <Pagination page={page} setPage={setPage} limit={limit} total={total} disabled={isLoading} />
      </div>
    </div>
  );
}
