import { RouterProvider } from "react-router-dom";
import { useAuthStore } from "../../features/auth/store/authStore";
import { useEffect, useMemo } from "react";
import api from "../../lib/axios";
import { getRouter } from "../routes/routes";
import { socket } from "../../lib/socket";

export default function Routes() {
  const { user, token } = useAuthStore();

  const isLoggedIn = !!token;
  const isSuperAdmin = user?.role === "SUPER_ADMIN";

  useEffect(() => {
    if (isLoggedIn) {
      api.get("/auth/profile");
      socket.connect();
      socket.auth = {
        token: localStorage.getItem("access"),
      };
    }
    return () => {
      socket.disconnect();
    };
  }, [isLoggedIn]);

  const router = useMemo(
    () => getRouter(isLoggedIn, isSuperAdmin),
    [isLoggedIn, isSuperAdmin]
  );

  return <RouterProvider router={router} />;
}
