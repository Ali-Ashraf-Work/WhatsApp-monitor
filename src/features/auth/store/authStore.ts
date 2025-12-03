import { create } from "zustand";
import type { AuthState } from "../types/AuthTypes";
import { persist } from "zustand/middleware";
import { socket } from "../../../lib/socket";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: (user, token) => {
        set({ user, token });
      },

      logout: () => {
        set({ user: null, token: null });
        socket.disconnect();
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
