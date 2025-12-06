import { useParams } from "react-router-dom";
import ConversationList from "../components/ConversationList";
import { useEffect, useState } from "react";
import { useInfiniteQuery, useQuery, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import type {
  Conversation,
  MessagesResponse,
} from "../types/chatTypes";
import api from "../../../lib/axios";
import MessagesList from "../components/MessagesList";
import { socket } from "../../../lib/socket";
import WhatsAppLoadingScreen from "../components/WhatsAppLoadingScreen";
import ConversationPlaceholder from "../components/ConversationPlaceholder";
import MessageSkeleton from "../components/MessageSkeleton";
import { BiMenu, BiX } from "react-icons/bi";

export default function Chat() {
  const [page, setPage] = useState<number>(1);
  const limit = 20 as number;
  const [filterType, setFilterType] = useState<'all' | 'chats' | 'groups'>('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { numberId } = useParams();
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);


  const queryClient = useQueryClient();
  const { data: conversations, isPending: isLoadingConversations } = useQuery({
    queryKey: ["conversations", numberId, page, filterType],
    queryFn: async () => {
      const res = await api.get(`/conversations?whatsAppNumberId=${numberId}&limit=${limit}${page > 1 ? `&page=${page}` : ""}&type=${filterType}`);
      return res.data.data || [];
    },
    enabled: !!numberId,
  });


  const {
    data: messagesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingMessages
  } = useInfiniteQuery({
    queryKey: ["messages", activeConversationId],
    queryFn: async ({ pageParam }) => {
      const res = await api.get(`/messages/conversation/${numberId}:${activeConversationId}?limit=20${pageParam ? `&cursor=${pageParam}` : ""}`);
      return res.data;
    },
    getNextPageParam: (lastPage: MessagesResponse) =>
      lastPage.pagination?.hasMore
        ? lastPage.pagination.nextCursor
        : undefined,
    initialPageParam: null,
    enabled: !!activeConversationId && !!numberId,
  });

  // Fix: Reverse pages array so older messages come first, then flatten
  const messages = messagesData?.pages.slice().reverse().flatMap((page) => page.data.messages) || [];

  // Real-time message handling
  useEffect(() => {
    if (!numberId) return;

    socket.on("whatsapp:authenticated", (data) => {
      console.log("authenticated:", data);
    });

    socket.on("whatsapp:disconnected", (data) => {
      console.log("disconnected:", data);
    });

    socket.on("whatsapp:message", (newMessage) => {
      console.log("newMessage:", newMessage);
      const currentConvId = `${numberId}:${activeConversationId}`;

      // Update messages if the message belongs to the active conversation
      if (
        activeConversationId &&
        (newMessage.conversation.id === currentConvId ||
          newMessage.chatId === activeConversationId)
      ) {
        queryClient.setQueryData(
          ["messages", activeConversationId],
          (oldData: InfiniteData<MessagesResponse> | undefined) => {
            if (!oldData) return oldData;

            const newPages = [...oldData.pages];
            const lastPageIndex = newPages.length - 1;
            const lastPage = newPages[lastPageIndex];

            if (lastPage) {
              const messageExists = newPages.some(page =>
                page.data.messages.some(m => m.id === newMessage.id || m.waMessageId === newMessage.waMessageId)
              );

              if (!messageExists) {
                const newMessages = [...lastPage.data.messages, newMessage];
                newPages[lastPageIndex] = {
                  ...lastPage,
                  data: {
                    ...lastPage.data,
                    messages: newMessages
                  }
                };
              }
            }

            if (newMessage.fromMe === false) {
              queryClient.setQueryData(
                ["conversations", numberId],
                (oldData: { data: Conversation[] } | undefined) => {
                  if (!oldData?.data) return oldData;

                  const updatedConversations = oldData.data
                    .map((conv) => {
                      if (`${numberId}:${conv.id}` === newMessage.conversation.id) {
                        return {
                          ...conv,
                          lastMessage: {
                            ...conv.lastMessage,
                            content:
                              newMessage.content ||
                              newMessage.caption ||
                              (newMessage.type === "IMAGE" ? "📷 Image" : "Message"),
                            timestamp: newMessage.timestamp
                          },
                          timestamp: newMessage.timestamp,
                          unreadCount:
                            newMessage.fromMe === false
                              ? conv.unreadCount + 1
                              : conv.unreadCount,
                        };
                      }
                      return conv;
                    })
                    .sort(
                      (a, b) =>
                        new Date(b.timestamp).getTime() -
                        new Date(a.timestamp).getTime()
                    );

                  return {
                    ...oldData,
                    data: updatedConversations
                  };
                }
              );
            }

            return {
              ...oldData,
              pages: newPages,
            };
          }
        );
      }

      // Update all conversation queries (handles pagination)
      queryClient.setQueriesData(
        { queryKey: ["conversations", numberId] },
        (oldData: { data: Conversation[] } | undefined) => {
          if (!oldData?.data) return oldData;

          const updatedConversations = oldData.data
            .map((conv) => {
              if (`${numberId}:${conv.id}` === newMessage.conversation.id) {
                return {
                  ...conv,
                  lastMessage: {
                    ...conv.lastMessage,
                    content:
                      newMessage.content ||
                      newMessage.caption ||
                      (newMessage.type === "IMAGE" ? "📷 Image" : "Message"),
                    timestamp: newMessage.timestamp
                  },
                  timestamp: newMessage.timestamp,
                  unreadCount:
                    newMessage.fromMe === false
                      ? conv.unreadCount + 1
                      : conv.unreadCount,
                };
              }
              return conv;
            })
            .sort(
              (a, b) =>
                new Date(b?.timestamp).getTime() -
                new Date(a?.timestamp).getTime()
            );

          return {
            ...oldData,
            data: updatedConversations
          };
        }
      );
    });

    return () => {
      socket.off("whatsapp:authenticated");
      socket.off("whatsapp:disconnected");
      socket.off("whatsapp:message");
    };
  }, [numberId, queryClient, activeConversationId]);

  // Get active conversation details
  const activeConversation = conversations?.data?.find(
    (conv: Conversation) => conv.id === activeConversationId
  );

  return (
    <div className="flex h-screen bg-black-900 overflow-hidden">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black-pure bg-opacity-70 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Conversations */}
      <div className={`
        fixed lg:relative
        w-full sm:w-96
        h-full
        bg-elegant-purple
        border-r border-elegant-purple
        transform transition-transform duration-300 ease-out
        z-50 lg:z-0
        flex flex-col
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {numberId ? (
          <>
            {/* Sidebar Header */}
            <div className="bg-elegant-card border-b border-elegant-purple p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-text-primary">Conversations</h2>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="lg:hidden p-2 hover:bg-black-600 rounded-lg transition-colors"
                >
                  <BiX className="w-6 h-6 text-text-primary" />
                </button>
              </div>

              {/* Compact Filter Pills */}
              <div className="flex gap-1.5">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${filterType === 'all'
                    ? 'bg-accent-purple text-text-primary shadow-elegant-purple'
                    : 'bg-black-700 text-text-muted hover:bg-black-600 hover:text-text-secondary'
                    }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterType('chats')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${filterType === 'chats'
                    ? 'bg-accent-blue text-text-primary shadow-elegant-blue'
                    : 'bg-black-700 text-text-muted hover:bg-black-600 hover:text-text-secondary'
                    }`}
                >
                  Chats
                </button>
                <button
                  onClick={() => setFilterType('groups')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${filterType === 'groups'
                    ? 'bg-accent-teal text-text-primary shadow-elegant-teal'
                    : 'bg-black-700 text-text-muted hover:bg-black-600 hover:text-text-secondary'
                    }`}
                >
                  Groups
                </button>
              </div>
            </div>

            {/* Conversation List */}
            <ConversationList
              conversations={conversations?.data || []}
              setActiveConversationId={(id) => {
                setActiveConversationId(id);
                setIsSidebarOpen(false); // Close sidebar on mobile when selecting
              }}
              activeConversationId={activeConversationId}
              page={page}
              setPage={setPage}
              limit={conversations?.pagination?.limit || 20}
              total={conversations?.pagination?.total || 0}
              isLoading={isLoadingConversations}
            />
          </>
        ) : (
          <ConversationPlaceholder />
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 flex flex-col bg-elegant-subtle overflow-hidden">
        {/* Messages Header */}
        {activeConversation && (
          <div className="bg-elegant-card border-b border-elegant px-4 py-3 flex items-center gap-3 shadow-elegant">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-black-600 rounded-lg transition-colors"
            >
              <BiMenu className="w-6 h-6 text-text-primary" />
            </button>

            {/* Active Contact Info */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="bg-linear-to-br from-accent-purple to-accent-blue text-text-primary rounded-full w-10 h-10 flex items-center justify-center shrink-0 font-bold shadow-elegant">
                {activeConversation.name?.[0]?.toUpperCase() || activeConversation.phone[0]}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-text-primary truncate">
                  {activeConversation.name || "Unknown Customer"}
                </h3>
                <p className="text-xs text-text-muted font-mono truncate">
                  {activeConversation.phone}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Messages Content */}
        <div className="flex-1 overflow-hidden">
          {!activeConversationId ? (
            <ConversationPlaceholder />
          ) : isLoadingMessages ? (
            <MessageSkeleton />
          ) : (
            messages && <MessagesList messages={messages} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} isFetchingNextPage={isFetchingNextPage} />
          )}
        </div>
      </div>

      <WhatsAppLoadingScreen />
    </div>
  );
}
