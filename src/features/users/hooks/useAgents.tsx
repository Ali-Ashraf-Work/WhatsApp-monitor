import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../../lib/axios";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
export const useAgents = () => {
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const { data: agentsData, isPending: isAgentsLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.get("/agents");
      return res.data.data;
    },
    enabled: pathname === "/users",
  });

  const { mutateAsync: createUser, isPending: isCreateLoading } = useMutation({
    mutationFn: (data: {
      name: string;
      email: string;
      password: string;
      role: "MANAGER" | "SUPER_ADMIN";
    }) => api.post("/agents", data),
    onSuccess: (res) => {
      toast.success(res.data.data.message);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: AxiosError) => console.log(error.response?.data),
  });

  const { mutateAsync: updateUser, isPending: isUpdateLoading } = useMutation({
    mutationFn: ({
      data,
      id,
    }: {
      data: {
        name: string;
        email: string;
        password: string;
        role: "MANAGER" | "SUPER_ADMIN";
      };
      id: string;
    }) => api.put(`/agents/${id}`, data),
    onSuccess: () => {
      toast.success("Successfully updated!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: AxiosError) => console.log(error.response?.data),
  });

  const { mutateAsync: deleteUser, isPending: isDeleteLoading } = useMutation({
    mutationFn: (userId: string) => api.delete(`/agents/${userId}`),
    onSuccess: () => {
      toast.success("Successfully deleted!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: AxiosError) => console.log(error.response?.data),
  });

  return {
    // create user
    createUser,
    isCreateLoading,

    // read users
    agentsData,
    isAgentsLoading,

    // update user
    updateUser,
    isUpdateLoading,

    // delete user
    deleteUser,
    isDeleteLoading,
  };
};
