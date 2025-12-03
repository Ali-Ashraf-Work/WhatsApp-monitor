import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../lib/axios";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
export const useCreateContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { displayName: string; }) =>
      api.post("/whatsapp-numbers", data),
    onSuccess: (res) => {
      toast.success(res.data.data.message);
      queryClient.invalidateQueries({ queryKey: ["agents"] });
    },
    onError: (error: AxiosError) => console.log(error.response?.data),
  });
};
