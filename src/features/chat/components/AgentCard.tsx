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
        className={`group relative overflow-hidden rounded-lg transition-all duration-300 hover-elegant ${isActive
            ? "bg-elegant-elevated shadow-elegant-purple border-2 border-accent-purple"
            : "bg-elegant-card border border-elegant hover:border-accent-purple"
          }`}
      >
        <Link to={`/chat/${agent.id}`} className="block p-3">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div
              className={`shrink-0 rounded-full p-3 transition-all duration-300 ${isActive
                  ? "bg-linear-to-br from-accent-purple to-accent-blue shadow-elegant-purple"
                  : "bg-linear-to-br from-accent-purple/30 to-accent-blue/30"
                }`}
            >
              <FaPhone className={`h-4 w-4 ${isActive ? 'text-text-primary' : 'text-accent-purple'}`} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className={`font-semibold truncate text-sm mb-0.5 ${isActive ? 'text-text-primary' : 'text-text-secondary'
                }`}>
                {agent.displayName}
              </h3>
              <p className="text-xs text-text-muted truncate font-mono">
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
              className="shrink-0 rounded-lg bg-error/10 p-2 text-error transition-all hover:bg-error/20 hover-elegant-scale active:scale-95"
              aria-label="Delete contact"
            >
              <FaTrash className="h-3.5 w-3.5" />
            </button>
          </div>
        </Link>

        {/* Active indicator */}
        {isActive && (
          <div className="absolute left-0 top-0 h-full w-1 bg-linear-to-b from-accent-purple to-accent-blue shadow-elegant-purple" />
        )}
      </div>
    )
  );
}
