import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "../../layout/AppLayout";
import LoginPage from "../../features/auth/pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import Chat from "../../features/chat/pages/Chat";
import NumberListLayout from "../../layout/NumberListLayout";
import Users from "../../features/users/pages/Users";

export const getRouter = (isLoggedIn: boolean, isSuperAdmin?: boolean) =>
  createBrowserRouter([
    {
      path: "/",
      element: isLoggedIn ? <AppLayout /> : <Navigate to="/login" replace />,
      children: [
        { index: true, element: <Navigate to="/chat" replace /> },
        {
          path: "chat",
          element: <NumberListLayout />,
          children: [
            { index: true, element: <Chat /> },
            {
              path: ":numberId",
              element: <Chat />,
              children: [{ index: true, element: <Chat /> }],
            },
            { path: "*", element: <NotFoundPage /> },
          ],
        },
        {
          path: "users",
          element: isSuperAdmin ? <Users /> : <NotFoundPage />,
        },
      ],
    },
    { path: "login", element: <LoginPage /> },
    { path: "*", element: <NotFoundPage /> },
  ]);
