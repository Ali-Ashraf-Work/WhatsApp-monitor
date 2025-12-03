export interface UserCredentials {
    email: string;
    password: string;
}

export interface User {
    id: string;
    email: string;
    name: string;
    role: string;
}


interface AuthState {
  user: User | null;
  token: string | null;

  login: (user: User, token: string) => void;
  logout: () => void;
}