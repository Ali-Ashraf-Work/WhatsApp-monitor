import Pagination from "../../../core/components/Pagination";
import type { Conversation } from "../types/chatTypes";
import { formatTime } from "../utils/helpers";
import ConversationListSkeleton from "./ConversationListSkeleton";

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
    <div className="flex flex-col h-[calc(100vh-6rem)] bg-elegant-purple">
      <div className="flex-1 overflow-y-auto p-2 sm:p-3">
        {isLoading ? (
          <ConversationListSkeleton />
        ) : conversations?.map((conversation: Conversation) => (
          <div
            key={conversation.id}
            onClick={() => setActiveConversationId(conversation.id)}
            className={`flex items-start gap-2 sm:gap-3 cursor-pointer rounded-lg p-2 sm:p-3 mb-2 transition-all duration-300 hover-elegant ${activeConversationId === conversation.id
                ? "bg-elegant-elevated shadow-elegant-purple border border-elegant-purple"
                : "bg-elegant-card border border-elegant hover:shadow-elegant"
              }`}
          >
            {/* Customer Avatar */}
            <div className="bg-linear-to-br from-accent-purple to-accent-blue text-text-primary rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0 font-bold text-base sm:text-lg shadow-elegant">
              {conversation.name?.[0]?.toUpperCase() ||
                conversation.phone[0]}
            </div>

            <div className="flex-1 min-w-0">
              {/* Customer Name & Time */}
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2 flex-1">
                  <p className="font-semibold text-text-primary truncate text-sm sm:text-base">
                    {conversation.name || "Unknown Customer"}
                  </p>
                  {conversation.unreadCount > 0 && (
                    <span className="bg-accent-rose text-text-primary text-xs px-2 py-0.5 rounded-full font-medium shadow-elegant">
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
              </div>

              {/* Customer Phone */}
              <div className="flex items-center gap-1 text-xs sm:text-sm text-text-secondary mb-1">
                <span className="font-mono">{conversation.phone}</span>
              </div>

              {/* Last Message Preview */}
              <div className="flex items-center gap-1 text-xs sm:text-sm text-text-muted italic truncate">
                <span className="text-xs text-accent-teal shrink-0">{formatTime(conversation.lastMessage.timestamp)}:</span>
                <span className="truncate">{conversation.lastMessage.content}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination at Bottom - Uses shrink-0 to prevent flex shrinking */}
      <div className="shrink-0 flex items-center justify-center px-2 sm:px-3 py-3 border-t border-elegant-purple bg-elegant-card shadow-elegant-lg">
        <Pagination page={page} setPage={setPage} limit={limit} total={total} disabled={isLoading} />
      </div>
    </div>
  );
}
