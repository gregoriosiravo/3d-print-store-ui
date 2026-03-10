export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
  username?: string;
  role: UserRole;
  createdAt: Date;
}

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  GUEST = "guest",
}

export interface UserProfile extends User {
  bio?: string;
  company?: string;
  phone?: string;
}

export type UserUpdateInput = Partial<Omit<User, "id" | "createdAt">>;
