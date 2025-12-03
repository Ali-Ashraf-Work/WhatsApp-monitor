import { useMutation } from "@tanstack/react-query";
import api from "../../../lib/axios";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";
import { useAuthStore } from "../store/authStore";
export const useLogin = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      api.post("/auth/login", data),
    onSuccess: (res) => {
      localStorage.setItem("access", res.data.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data.agent));
      navigate("/");
      login(res?.data?.data?.agent, res.data?.data?.token);
    },

    onError: (error: AxiosError) => console.log(error.response?.data),
  });
};
