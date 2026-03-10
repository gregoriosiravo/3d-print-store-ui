export default defineNuxtRouteMiddleware(() => {
  const userStore = useUserStore();

  if (!userStore.isAuthenticated) {
    return navigateTo({
      path: "/login",
      query: { redirect: "/profile" },
    });
  }
});
