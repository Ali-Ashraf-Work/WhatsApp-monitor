import { Link, useParams } from "react-router-dom";
import type { Agent } from "../types/chatTypes";
import { FaPhone, FaTrash } from "react-icons/fa6";
import { useDeleteContact } from "../hooks/useDeleteContact";

export default function AgentCard({ agent }: { agent: Agent }) {
  const { numberId } = useParams();
  const { mutate: deleteAgent } = useDeleteContact();
  const isActive = numberId === agent.id;

  return (
    agent && (
      <div
        className={`group relative overflow-hidden transition-all duration-200 hover:shadow-md ${
          isActive
            ? "bg-brand-primary-100 shadow-sm mb-1"
            : "bg-white  shadow-sm  hover:border-brand-primary-500"
        }`}
      >
        <Link to={`/chat/${agent.id}`} className="block p-4">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div
              className={`shrink-0 rounded-full p-3 transition-all ${
                isActive
                  ? "bg-linear-to-br from-brand-primary-500 to-brand-primary-900 text-white"
                  : "bg-linear-to-br from-brand-primary-100 to-10% to-brand-primary-500 text-white "
              }`}
            >
              <FaPhone className="h-5 w-5" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate text-sm mb-1">
                {agent.displayName}
              </h3>
              <p className="text-xs text-gray-500 truncate font-mono">
                {agent.phoneNumber}
              </p>
            </div>

            {/* Delete Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                deleteAgent(agent.id);
              }}
              className="shrink-0 rounded-lg bg-red-50 p-2 text-red-600 transition-all hover:bg-red-100 hover:scale-110 active:scale-95"
              aria-label="Delete contact"
            >
              <FaTrash className="h-4 w-4" />
            </button>
          </div>
        </Link>

        {/* Active indicator */}
        {isActive && (
          <div className="absolute left-0 top-0 h-full w-1 bg-linear-to-b from-brand-primary-500 to-brand-primary-900" />
        )}
      </div>
    )
  );
}
