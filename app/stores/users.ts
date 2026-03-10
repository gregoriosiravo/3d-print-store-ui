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
    async login(email: string, password: string) {
      this.loading = true;
      this.error = null;
      try {
        const response = await $fetch<{ user: User; token?: string }>(
          `${useRuntimeConfig().public.API_BASE_URL}/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          },
        );

        console.log("Login successful");
        this.isAuthenticated = true;
        if (response.token) {
          useCookie("auth_token").value = response.token;
        }
        await navigateTo("/");
      } catch (err) {
        console.error(err);
        this.error = "Login failed. Please try again.";
      } finally {
        this.loading = false;
      }
    },
    async logout() {
      try {
        await $fetch("api/auth/logout", {
          method: "POST",
        });
        this.user = null;
        this.isAuthenticated = false;
        useCookie("auth_token").value = null;
        await navigateTo("/");
      } catch (err) {
        console.error("Logout failed:", err);
      }
    },
    async registerUser(
      firstName: string,
      lastName: string,
      email: string,
      password: string,
    ) {
      try {
        const response = await $fetch<{ user: User; token?: string }>(
          `${useRuntimeConfig().public.API_BASE_URL}/auth/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
              firstName: firstName,
              lastName: lastName,
            }),
          },
        );
        this.isAuthenticated = true;
        console.log("Register and Login successful, user:", this.user);
        await navigateTo("/"); //TODO: dinamically navigate to the last page visited or to the profile page
      } catch (err) {
        console.error("Navigation to register failed:", err);
      }
    },
    async fetchUser() {
      try {
        const response = await fetch(
          `${useRuntimeConfig().public.API_BASE_URL}/auth/profile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${useCookie("auth_token").value}`,
            },
          },
        );
        const userData = await response.json();
        console.log("Fetched user data:", userData);
        this.user = {
          ...userData,
          createdAt: new Date(userData.createdAt),
        };
      } catch (err) {
        console.error("Fetch user failed:", err);
      }
    },
    //TODO: add update profile action
    //TODO: add change password action
    //TODO: add fetch current user action
  },
});
