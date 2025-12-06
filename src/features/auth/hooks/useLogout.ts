import { useMutation } from "@tanstack/react-query";
import api from "../../../lib/axios";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const { logout: clearAuth } = useAuthStore();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async () => {
            return await api.post("/auth/logout");
        },
        onSuccess: () => {
            clearAuth();
            navigate("/login");
        },
        onError: (error) => {
            console.error("Logout error:", error);
            clearAuth();
            navigate("/login");
        },
    });
};
