import { useQuery } from "@tanstack/react-query";
import api from "../../../lib/axios";
import type { Agent } from "../types/chatTypes";
import { RiSimCard2Line } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import AgentCard from "./AgentCard";
import CreateForm from "./CreateForm";
import { useState } from "react";
import AgentCardSkeleton from "./AgentCardSkeleton";
import { socket } from "../../../lib/socket";
import { FaUserAlt } from "react-icons/fa";
import { useAuthStore } from "../../auth/store/authStore";
import { Link } from "react-router-dom";

export default function AgentList() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthStore();

  const isSuperAdmin = user?.role === "SUPER_ADMIN";
  const {
    data: agents,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["agents"],
    queryFn: () => api.get("/whatsapp-numbers"),
    select: (res) => res.data.data,
  });

  const onCLose = (id?: string) => {
    setIsOpen(false);
    if (id) {
      socket.emit("whatsapp:qr-close", {
        whatsappNumberId: id,
      });
    }
  };

  return (
    <>
      <div>
        <CreateForm isOpen={isOpen} onClose={onCLose} />
      </div>
      <div className="flex flex-col h-full bg-elegant-purple">
        {/* Header */}
        <div className="bg-elegant-card border-b border-elegant-purple px-4 py-4 shadow-elegant">
          <div className="flex items-start justify-between">
            <div className="flex items-center justify-start gap-2">
              <div className="p-2 bg-linear-to-br from-accent-purple to-accent-blue rounded-lg shadow-elegant-purple">
                <RiSimCard2Line size={24} className="text-text-primary" />
              </div>
              <div>
                <span className="font-bold text-xl text-text-primary">Agent List</span>
                <p className="text-xs text-text-muted mt-0.5">Select number to view conversations</p>
              </div>
            </div>
            {!isError && !isLoading && (
              <div className="flex items-center justify-end gap-2">
                <button
                  className="p-2.5 bg-accent-purple hover:bg-accent-blue rounded-lg transition-all duration-300 hover-elegant shadow-elegant-purple"
                  onClick={() => setIsOpen(true)}
                >
                  <IoMdAdd size={20} className="text-text-primary" />
                </button>
                {isSuperAdmin && (
                  <Link
                    to="/users"
                    className="p-2.5 bg-accent-teal hover:bg-accent-blue rounded-lg transition-all duration-300 hover-elegant shadow-elegant-teal"
                  >
                    <FaUserAlt size={18} className="text-text-primary" />
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Agent Cards */}
        <div className="flex-1 overflow-y-auto p-2">
          <div className="space-y-2">
            {agents ? (
              agents.map((agent: Agent) => (
                <AgentCard agent={agent} key={agent.id} />
              ))
            ) : (
              <AgentCardSkeleton />
            )}
            {isLoading && <AgentCardSkeleton />}
            {isError && <AgentCardSkeleton />}
          </div>
        </div>
      </div>
    </>
  );
}
