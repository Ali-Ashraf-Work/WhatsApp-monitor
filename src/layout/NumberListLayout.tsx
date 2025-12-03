import { Outlet } from "react-router-dom";
import AgentList from "../features/chat/components/AgentList";

export default function NumberListLayout() {
  return (
    <div className="grid grid-cols-10 relative">
      <div className="col-span-2 h-screen sticky top-0 left-0 bottom-0 bg-background-default">
        <AgentList />
      </div>
      <div className="col-span-8">
        <Outlet />
      </div>
    </div>
  );
}
