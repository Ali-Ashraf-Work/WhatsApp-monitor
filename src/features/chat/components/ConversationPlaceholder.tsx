import { BiMessageSquareDetail } from "react-icons/bi";

export default function ConversationPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-500 bg-white/20">
      <div className="bg-gray-100 p-6 rounded-full mb-4">
        <BiMessageSquareDetail className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        Select a Conversation
      </h3>
      <p className="text-sm text-gray-400">
        Choose a chat from the list to view messages
      </p>
    </div>
  );
}
