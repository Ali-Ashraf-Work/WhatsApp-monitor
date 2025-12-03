import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../lib/axios";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (phoneNumberId: string) =>
      api.delete(`/whatsapp-numbers/${phoneNumberId}`),
    onSuccess: () => {
      toast.success("Successfully toasted!");
      queryClient.invalidateQueries({ queryKey: ["agents"] });
    },
    onError: (error: AxiosError) => console.log(error.response?.data),
  });
};
