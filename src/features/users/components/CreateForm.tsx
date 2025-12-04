import { useForm } from "react-hook-form";
import Input from "../../../core/components/Input";
import Modal from "../../../core/components/Modal";
import type { User, UserCredentials } from "../types/userTypes";
import { useAgents } from "../hooks/useAgents";
import { useEffect } from "react";
import SelectMenu from "../../../core/components/SelectMenu";
import { FiUserPlus, FiEdit } from "react-icons/fi";

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
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-linear-to-br from-accent-purple to-accent-blue rounded-full mb-4 shadow-elegant-purple">
            {editingUser ? (
              <FiEdit className="w-7 h-7 text-text-primary" />
            ) : (
              <FiUserPlus className="w-7 h-7 text-text-primary" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            {editingUser ? "Edit User" : "Create New User"}
          </h2>
          <p className="text-sm text-text-muted">
            {editingUser ? "Update user information" : "Add a new team member"}
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Name"
            name="name"
            placeholder="e.g., John Doe"
            type="text"
            required
            register={register}
          />

          <Input
            label="Email"
            name="email"
            placeholder="example@gmail.com"
            type="email"
            required
            register={register}
          />

          <Input
            label="Password"
            name="password"
            placeholder="••••••••"
            type="password"
            required
            register={register}
          />

          <SelectMenu
            label="Role"
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
            className="w-full bg-linear-to-r from-accent-purple to-accent-blue hover:from-accent-blue hover:to-accent-purple text-text-primary font-semibold py-3.5 rounded-lg transition-all duration-300 hover-elegant shadow-elegant-purple disabled:opacity-50 disabled:cursor-not-allowed disabled:from-black-600 disabled:to-black-600"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {editingUser ? "Updating..." : "Creating..."}
              </span>
            ) : (
              editingUser ? "Update User" : "Create User"
            )}
          </button>
        </form>
      </div>
    </Modal>
  );
}
