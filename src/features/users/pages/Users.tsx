import { useState } from "react";
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiUser,
  FiMail,
  FiShield,
} from "react-icons/fi";
import { useAgents } from "../hooks/useAgents";
import CreateForm from "../components/CreateForm";
import type { User } from "../types/userTypes";
import { formatTime } from "../../chat/utils/helpers";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Users = () => {
  const { agentsData, isAgentsLoading, deleteUser } = useAgents();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  if (isAgentsLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-elegant-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-purple"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-elegant-dark">
      {/* Header */}
      <div className="p-4 md:p-6 bg-elegant-card border-b border-elegant-purple shadow-elegant">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-elegant-elevated text-text-primary rounded-lg hover:bg-black-600 transition-all duration-300 hover-elegant shadow-elegant w-fit"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Go Back</span>
          </Link>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-text-primary">User Management</h1>
            <p className="text-sm text-text-muted mt-1">
              Manage your team members and their roles
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-accent-purple text-text-primary rounded-lg hover:bg-accent-blue transition-all duration-300 hover-elegant shadow-elegant-purple w-fit"
          >
            <FiPlus className="w-5 h-5" />
            <span className="text-sm font-medium">Add User</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="bg-elegant-card rounded-lg shadow-elegant-lg overflow-hidden border border-elegant-purple">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-elegant-elevated border-b border-elegant-purple">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-elegant">
                {agentsData?.map((user: User) => (
                  <tr
                    key={user.id}
                    className="hover:bg-elegant-elevated transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="shrink-0 h-10 w-10 bg-linear-to-br from-accent-purple to-accent-blue rounded-full flex items-center justify-center shadow-elegant-purple">
                          <FiUser className="text-text-primary" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-text-primary">
                            {user.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-text-secondary">
                        <FiMail className="mr-2 text-text-muted" />
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === "SUPER_ADMIN"
                            ? "bg-accent-purple/20 text-accent-purple border border-accent-purple/30"
                            : "bg-accent-blue/20 text-accent-blue border border-accent-blue/30"
                          }`}
                      >
                        <FiShield className="mr-1" />
                        {user.role.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.isOnline
                            ? "bg-success/20 text-success border border-success/30"
                            : "bg-black-600 text-text-muted border border-elegant"
                          }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full mr-1.5 ${user.isOnline ? "bg-success" : "bg-text-muted"
                            }`}
                        ></span>
                        {user.isOnline ? "Online" : "Offline"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
                      {user.createdAt && formatTime(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          setEditingUser(user);
                          setIsModalOpen(true);
                        }}
                        className="text-accent-blue hover:text-accent-purple mr-4 transition-colors p-2 hover:bg-elegant-elevated rounded-lg"
                      >
                        <FiEdit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="text-error hover:text-error/80 transition-colors p-2 hover:bg-error/10 rounded-lg"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-elegant">
            {agentsData?.map((user: User) => (
              <div
                key={user.id}
                className="p-4 hover:bg-elegant-elevated transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="shrink-0 h-12 w-12 bg-linear-to-br from-accent-purple to-accent-blue rounded-full flex items-center justify-center shadow-elegant-purple">
                      <FiUser className="text-text-primary text-lg" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-semibold text-text-primary">
                        {user.name}
                      </div>
                      <div className="text-xs text-text-muted flex items-center mt-1">
                        <FiMail className="mr-1" />
                        {user.email}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${user.role === "SUPER_ADMIN"
                        ? "bg-accent-purple/20 text-accent-purple border border-accent-purple/30"
                        : "bg-accent-blue/20 text-accent-blue border border-accent-blue/30"
                      }`}
                  >
                    <FiShield className="mr-1" />
                    {user.role.replace("_", " ")}
                  </span>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${user.isOnline
                        ? "bg-success/20 text-success border border-success/30"
                        : "bg-black-600 text-text-muted border border-elegant"
                      }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full mr-1 ${user.isOnline ? "bg-success" : "bg-text-muted"
                        }`}
                    ></span>
                    {user.isOnline ? "Online" : "Offline"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-muted">
                    Created:{" "}
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : ""}
                  </span>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setEditingUser(user);
                        setIsModalOpen(true);
                      }}
                      className="text-accent-blue hover:text-accent-purple transition-colors p-2 hover:bg-elegant-elevated rounded-lg"
                    >
                      <FiEdit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-error hover:text-error/80 transition-colors p-2 hover:bg-error/10 rounded-lg"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {agentsData?.length === 0 && (
            <div className="text-center py-12">
              <FiUser className="mx-auto h-12 w-12 text-text-muted" />
              <h3 className="mt-2 text-sm font-medium text-text-primary">No users</h3>
              <p className="mt-1 text-sm text-text-muted">
                Get started by creating a new user.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      <CreateForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingUser={editingUser}
      />
    </div>
  );
};

export default Users;
