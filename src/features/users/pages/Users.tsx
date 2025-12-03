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
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen">
      <div className="p-4 md:p-6 bg-linear-to-br from-brand-primary-500 to-brand-primary-700 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-brand-primary-700 rounded-3xl hover:bg-brand-primary-100 transition-colors"
          >
            <FaArrowLeft  className="w-5 h-5" />
            <span>Go Back</span>
          </Link>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="text-sm text-white mt-1">
            Manage your team members and their roles
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-brand-primary-500 text-white rounded-3xl hover:bg-brand-primary-700 transition-colors"
        >
          <FiPlus className="w-5 h-5" />
          <span>Add User</span>
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {agentsData?.map((user: User) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="shrink-0 h-10 w-10 bg-brand-primary-100 rounded-full flex items-center justify-center">
                        <FiUser className="text-brand-primary-700" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-600">
                      <FiMail className="mr-2 text-gray-400" />
                      {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === "SUPER_ADMIN"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      <FiShield className="mr-1" />
                      {user.role.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.isOnline
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full mr-1.5 ${
                          user.isOnline ? "bg-green-500" : "bg-gray-500"
                        }`}
                      ></span>
                      {user.isOnline ? "Online" : "Offline"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.createdAt && formatTime(user.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => {
                        setEditingUser(user);
                        setIsModalOpen(true);
                      }}
                      className="text-brand-primary-500 hover:text-brand-primary-700 mr-4 transition-colors"
                    >
                      <FiEdit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-red-600 hover:text-red-900 transition-colors"
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
        <div className="md:hidden divide-y divide-gray-200">
          {agentsData?.map((user: User) => (
            <div
              key={user.id}
              className="p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className="shrink-0 h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiUser className="text-blue-600 text-lg" />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-semibold text-gray-900">
                      {user.name}
                    </div>
                    <div className="text-xs text-gray-600 flex items-center mt-1">
                      <FiMail className="mr-1" />
                      {user.email}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    user.role === "SUPER_ADMIN"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  <FiShield className="mr-1" />
                  {user.role.replace("_", " ")}
                </span>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    user.isOnline
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full mr-1 ${
                      user.isOnline ? "bg-green-500" : "bg-gray-500"
                    }`}
                  ></span>
                  {user.isOnline ? "Online" : "Offline"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
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
                    className="text-blue-600 hover:text-blue-900 transition-colors"
                  >
                    <FiEdit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="text-red-600 hover:text-red-900 transition-colors"
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
            <FiUser className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No users</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new user.
            </p>
          </div>
        )}
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
