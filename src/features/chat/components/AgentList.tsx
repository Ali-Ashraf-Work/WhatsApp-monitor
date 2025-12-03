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
      <div className="flex flex-col h-full">
        <div className="font-bold bg-linear-to-br from-brand-primary-500 to-brand-primary-900 text-white px-4 py-3 ">
          <div className="flex items-start justify-between">
            <div className="flex items-center justify-start gap-2">
              <RiSimCard2Line size={25} />
              <span className="font-bold text-xl ">Agent List</span>
            </div>
            {!isError && !isLoading && (
              <div className="flex items-center justify-end gap-2">
                <div
                  className="cursor-pointer bg-white/20 p-2 rounded-2xl backdrop-blur-2xl"
                  onClick={() => setIsOpen(true)}
                >
                  <IoMdAdd size={20} />
                </div>
                {
                  isSuperAdmin &&
                  <Link to="/users" className="cursor-pointer bg-white/20 p-2 rounded-2xl backdrop-blur-2xl">
                    <FaUserAlt size={20} />
                  </Link>
                }
              </div>
            )}
          </div>
          <div className="text-xs font-medium py-1 px-1">
            select number to view conversation
          </div>
        </div>
        <div className="grid grid-cols-1 max-h-[calc(100vh-90px)] overflow-y-auto">
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
    </>
  );
}
