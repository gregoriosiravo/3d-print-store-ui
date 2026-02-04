import { defineStore } from "pinia";
import type { User } from "~/types/user";

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  }),
  getters: {
    isLoggedIn: (state): boolean => {
      return state.user !== null && state.isAuthenticated;
    },
    userName: (state): string => {
      return state.user
        ? `${state.user.firstName} ${state.user.lastName}`
        : "Guest";
    },
    userInitials: (state): string => {
      if (!state.user?.firstName) return "G";
      if (state.user.avatarUrl) return "";
      let fullname = `${state.user.firstName} ${state.user.lastName}`;
      return fullname
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    },
    isAdmin: (state) => {
      return state.user?.role === "admin";
    },
  },
  actions: {
    login() {},
    logout() {},
  },
});
