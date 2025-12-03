export interface UserCredentials {
  name: string;
  email: string;
  password: string;
  role: "MANAGER" | "SUPER_ADMIN";
}

export interface UsersResponse {
  success: boolean;
  message: string;
  data: User[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: "MANAGER" | "SUPER_ADMIN";
  isActive?: boolean;
  isOnline?: boolean;
  lastSeenAt?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
