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

export default function Chat() {

  const [page, setPage] = useState<number>(1);
  const limit = 20 as number
  const [filterType, setFilterType] = useState<'all' | 'chats' | 'groups'>('all');

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
    enabled: !!activeConversationId,
  });

  const messages = messagesData?.pages.flatMap((page) => page.data.messages.reverse()).reverse() || [];


  useEffect(() => {
    socket.on("whatsapp:authenticated", (data) => {
      console.log("authenticated:", data);
    });

    socket.on("whatsapp:disconnected", (data) => {
      console.log("disconnected:", data);
    });

    socket.on("whatsapp:message", (newMessage) => {
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
                const newMessages = [...lastPage.data.messages, newMessage,];
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
                new Date(b.timestamp).getTime() -
                new Date(a.timestamp).getTime()
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

  return (
    <div className="grid grid-cols-10 relative">
      <div className="col-span-3 h-screen sticky top-0 left-0 bottom-0 bg-white border-r-2 border-background-default">
        {numberId ? (
          <>
            {/* Filter Controls */}
            <div className="bg-white border-b border-gray-200 p-3">
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterType('all')}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${filterType === 'all'
                      ? 'bg-primary-default text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterType('chats')}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${filterType === 'chats'
                      ? 'bg-primary-default text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  Chats
                </button>
                <button
                  onClick={() => setFilterType('groups')}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${filterType === 'groups'
                      ? 'bg-primary-default text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  Groups
                </button>
              </div>
            </div>
            <ConversationList
              conversations={conversations?.data || []}
              setActiveConversationId={setActiveConversationId}
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
      <div className="col-span-7">
        {!activeConversationId ? (
          <ConversationPlaceholder />
        ) : isLoadingMessages ? (
          <MessageSkeleton />
        ) : (
          messages && <MessagesList messages={messages} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} isFetchingNextPage={isFetchingNextPage} />
        )}
      </div>
      <WhatsAppLoadingScreen />
    </div>
  );
}
