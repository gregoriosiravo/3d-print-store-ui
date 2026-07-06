export const useAuth = () => {
  const userStore = useUserStore()

  const user = computed(() => userStore.user)
  const isAuthenticated = computed(() => userStore.isAuthenticated)
  const isAdmin = computed(() => userStore.isAdmin)
  const fullName = computed(() => userStore.fullName)
  const userInitials = computed(() => userStore.userInitials)
  const userId = computed(() => userStore.userId)
  const loading = computed(() => userStore.loading)
  const error = computed(() => userStore.error)

  const login = async (email: string, password: string) => {
    await userStore.login(email, password)
  }

  const register = async (firstName: string, lastName: string, email: string, password: string) => {
    await userStore.registerUser(firstName, lastName, email, password)
  }

  const logout = async () => {
    await userStore.logout()
  }

  const fetchUser = async () => {
    await userStore.fetchUser()
  }

  const requireAuth = (redirect = '/profile') => {
    if (!isAuthenticated.value) {
      return navigateTo({ path: '/login', query: { redirect } })
    }
  }

  return {
    user,
    isAuthenticated,
    isAdmin,
    fullName,
    userInitials,
    userId,
    loading,
    error,
    login,
    register,
    logout,
    fetchUser,
    requireAuth,
  }
}
