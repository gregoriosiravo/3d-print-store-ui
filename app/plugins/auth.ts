export default defineNuxtPlugin(async () => {
  const userStore = useUserStore();
  const token = useCookie("auth_token");
  if (token.value && !userStore.isAuthenticated) {
    await userStore.fetchUser();
  }
});
