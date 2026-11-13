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
    fullName: (state): string => {
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
    userId: (state): string | null => state.user?.id || null,
  },
  actions: {
    // The API sets the HttpOnly session cookie; the browser sends it back with credentials: "include"
    async login(email: string, password: string) {
      this.loading = true;
      this.error = null;
      try {
        await $fetch(`${useRuntimeConfig().public.API_BASE_URL}/auth/login`, {
          method: "POST",
          credentials: "include",
          body: { email, password },
        });
        await this.fetchUser();
        await navigateTo("/");
      } catch (err) {
        console.error("Login failed:", err);
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async logout() {
      try {
        await $fetch(`${useRuntimeConfig().public.API_BASE_URL}/auth/logout`, {
          method: "POST",
          credentials: "include",
        });
      } catch (err) {
        console.error("Logout failed:", err);
      }
      this.user = null;
      this.isAuthenticated = false;
      await navigateTo("/");
    },
    async registerUser(
      firstName: string,
      lastName: string,
      email: string,
      password: string,
    ) {
      try {
        await $fetch(`${useRuntimeConfig().public.API_BASE_URL}/auth/register`, {
          method: "POST",
          credentials: "include",
          body: { email, password, firstName, lastName },
        });
        await this.fetchUser();
        await navigateTo("/");
      } catch (err) {
        console.error("Registration failed:", err);
        throw err;
      }
    },
    // Asks the API who the session belongs to; no session (401) means logged out
    async fetchUser() {
      try {
        const userData = await $fetch<any>(`${useRuntimeConfig().public.API_BASE_URL}/auth/profile`, {
          credentials: "include",
        });
        this.user = {
          ...userData,
          createdAt: new Date(userData.createdAt),
        };
        this.isAuthenticated = true;
      } catch {
        this.user = null;
        this.isAuthenticated = false;
      }
    },
    //TODO: add update profile action
    //TODO: add change password action
    //TODO: add fetch current user action
  },
});
