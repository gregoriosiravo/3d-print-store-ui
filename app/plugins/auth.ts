export default defineNuxtPlugin(async () => {
  // The session cookie is only read in the browser; server-side fetches would
  // target localhost:4000 from inside the UI container and fail.
  if (import.meta.server) return;
  const userStore = useUserStore();
  const token = useCookie("auth_token");
  if (token.value) {
    userStore.isAuthenticated = true;
    console.log("Token found, fetching user data...");
    await userStore.fetchUser();
  }
});
