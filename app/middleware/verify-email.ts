export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore();

  if (to.path !== "/verify-email") return;

  if (!to.query.token) {
    return navigateTo("/login");
  }

  if (!userStore.isAuthenticated) {
    return navigateTo({
      path: "/login",
      query: {
        redirect: to.fullPath,
      },
    });
  }

  return navigateTo("/profile");
});
