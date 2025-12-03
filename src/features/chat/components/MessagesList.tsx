import { useLayoutEffect, useRef } from "react";
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
  // const [autoScroll, setAutoScroll] = useState(true); 
  useLayoutEffect(() => {
    if (!isFetchingNextPage && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }

  }, [messages.length, isFetchingNextPage]);

  const handleLoadMore = () => {
    fetchNextPage();
  };

  return (
    <div
      ref={containerRef}
      // onScroll={handleScroll}
      className="overflow-y-auto h-screen p-6 bg-white/10"
    >
      {hasNextPage && (
        <div className="flex justify-center p-4">
          <button
            onClick={handleLoadMore}
            disabled={isFetchingNextPage}
            className="px-4 py-2 bg-white/80 hover:bg-white text-gray-800 text-sm font-medium rounded-full shadow-sm transition-colors disabled:opacity-50"
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
