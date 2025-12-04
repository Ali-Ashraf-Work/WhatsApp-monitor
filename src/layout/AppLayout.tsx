import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="bg-elegant-animated animate-gradientFlow min-h-screen">
      <Outlet />
    </div>
  );
}
