export default defineNuxtPlugin(async () => {
  const userStore = useUserStore();
  const token = useCookie("auth_token");
  if (token.value) {
    userStore.isAuthenticated = true;
    console.log("Token found, fetching user data...");
    await userStore.fetchUser();
  }
});
