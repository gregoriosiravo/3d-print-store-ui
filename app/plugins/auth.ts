export default defineNuxtPlugin(async () => {
  // The session is an HttpOnly cookie, so the browser cannot read it; ask the API instead.
  // Runs only in the browser: server-side requests would target localhost:4000 inside the UI container.
  if (import.meta.server) return;
  await useUserStore().fetchUser();
});
