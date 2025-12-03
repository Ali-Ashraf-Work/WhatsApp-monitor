import { useForm } from "react-hook-form";
import Input from "../../../core/components/Input";
import Modal from "../../../core/components/Modal";
import type { User, UserCredentials } from "../types/userTypes";
import { useAgents } from "../hooks/useAgents";
import { useEffect } from "react";
import SelectMenu from "../../../core/components/SelectMenu";

export default function CreateForm({
  isOpen,
  onClose,
  editingUser,
}: {
  isOpen: boolean;
  onClose: () => void;
  editingUser?: User | null;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<UserCredentials>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      role: "MANAGER",
    },
  });

  const { createUser, updateUser } = useAgents();
  const onSubmit = async (data: UserCredentials) => {
    if (editingUser) return await updateUser({ data, id: editingUser.id });
    reset();
    return await createUser(data);
  };

  useEffect(() => {
    reset({
      email: editingUser?.email || "",
      password: "",
      name: editingUser?.name || "",
      role: editingUser?.role || "MANAGER",
    });
  }, [editingUser, reset]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        if (!isSubmitting) onClose();
      }}
    >
      <div>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="name"
            name="name"
            placeholder="Aly - Sales Team"
            type="text"
            required
            register={register}
          />

          <Input
            label="email"
            name="email"
            placeholder="example@gmail"
            type="email"
            required
            register={register}
          />

          <Input
            label="password"
            name="password"
            placeholder="••••••••"
            type="password"
            required
            register={register}
          />

          <SelectMenu
            label="role"
            name="role"
            register={register}
            required
            options={[
              { value: "MANAGER", label: "Manager" },
              { value: "SUPER_ADMIN", label: "Super Admin" },
            ]}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-700"
          >
            {isSubmitting ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </Modal>
  );
}
