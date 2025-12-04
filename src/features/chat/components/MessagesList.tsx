import { useLayoutEffect, useRef, useState, useEffect } from "react";
import type { Message } from "../types/chatTypes";
import MessageComponent from "./Message";

export default function MessagesList({
  messages,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage
}: {
  messages: Message[],
  hasNextPage: boolean,
  fetchNextPage: () => void,
  isFetchingNextPage: boolean
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNearBottom, setIsNearBottom] = useState(true);
  const previousScrollHeightRef = useRef<number>(0);
  const previousScrollTopRef = useRef<number>(0);
  const isLoadingMoreRef = useRef(false);
  const previousMessageCountRef = useRef(messages.length);

  // Check if user is near bottom of chat
  const checkIfNearBottom = () => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    // Consider "near bottom" if within 100px
    setIsNearBottom(distanceFromBottom < 100);
  };

  // Handle scroll events
  const handleScroll = () => {
    checkIfNearBottom();
  };

  // Handle loading more messages
  const handleLoadMore = () => {
    if (!containerRef.current) return;

    // Store current scroll position before loading
    previousScrollHeightRef.current = containerRef.current.scrollHeight;
    previousScrollTopRef.current = containerRef.current.scrollTop;
    isLoadingMoreRef.current = true;

    fetchNextPage();
  };

  // Restore scroll position after loading more messages
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    // If we just loaded more messages
    if (isLoadingMoreRef.current && !isFetchingNextPage) {
      const newScrollHeight = containerRef.current.scrollHeight;
      const heightDifference = newScrollHeight - previousScrollHeightRef.current;

      // Maintain the same visual position by adjusting scrollTop
      containerRef.current.scrollTop = previousScrollTopRef.current + heightDifference;

      isLoadingMoreRef.current = false;
    }
  }, [isFetchingNextPage]);

  // Auto-scroll for new messages (WhatsApp-like behavior)
  useEffect(() => {
    if (!containerRef.current) return;

    // Only auto-scroll if:
    // 1. Not currently loading more messages
    // 2. User is near the bottom
    // 3. New messages were added (not initial load)
    const messageCountChanged = messages.length !== previousMessageCountRef.current;

    if (!isLoadingMoreRef.current && isNearBottom && messageCountChanged) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }

    previousMessageCountRef.current = messages.length;
  }, [messages.length, isNearBottom]);

  // Initial scroll to bottom on first load
  useLayoutEffect(() => {
    if (!containerRef.current || messages.length === 0) return;

    // Only scroll to bottom on initial load (when previousMessageCountRef is 0)
    if (previousMessageCountRef.current === 0) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
      previousMessageCountRef.current = messages.length;
    }
  }, [messages.length]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="overflow-y-auto h-full p-4 sm:p-6 bg-elegant-subtle"
    >
      {hasNextPage && (
        <div className="flex justify-center p-4">
          <button
            onClick={handleLoadMore}
            disabled={isFetchingNextPage}
            className="px-4 py-2.5 bg-elegant-elevated hover:bg-elegant-card text-accent-purple text-sm font-medium rounded-lg border border-elegant-purple transition-all duration-300 hover-elegant shadow-elegant disabled:opacity-50"
          >
            {isFetchingNextPage ? "Loading..." : "Load previous messages"}
          </button>
        </div>
      )}

      {messages && (
        <div>
          {messages.map((message: Message) => (
            <div key={message.id || message.waMessageId}>
              <MessageComponent message={message} />
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
}
