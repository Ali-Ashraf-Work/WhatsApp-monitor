import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div>
      <div className="bg-background-chat">
        <Outlet />
      </div>
    </div>
  );
}
