import { BiMessageSquareDetail } from "react-icons/bi";

export default function ConversationPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-elegant-subtle">
      <div className="bg-elegant-card p-8 rounded-2xl mb-4 shadow-elegant-lg border border-elegant-purple">
        <BiMessageSquareDetail className="w-16 h-16 text-accent-purple mx-auto" />
      </div>
      <h3 className="text-xl font-semibold text-text-primary mb-2">
        Select a Conversation
      </h3>
      <p className="text-sm text-text-muted">
        Choose a chat from the list to view messages
      </p>
    </div>
  );
}
