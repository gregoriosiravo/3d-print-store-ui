export const useApi = () => {
  const { public: { API_BASE_URL } } = useRuntimeConfig()

  const authHeaders = (): Record<string, string> => {
    const token = useCookie('auth_token').value
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  const jsonHeaders = (body?: any): Record<string, string> => {
    return body instanceof FormData ? {} : { 'Content-Type': 'application/json' }
  }

  async function get<T = unknown>(path: string): Promise<T> {
    return $fetch<T>(`${API_BASE_URL}${path}`, {
      method: 'GET',
      headers: { ...authHeaders() },
    })
  }

  async function post<T = unknown>(path: string, body?: any): Promise<T> {
    return $fetch<T>(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: { ...authHeaders(), ...jsonHeaders(body) },
      body,
    })
  }

  async function patch<T = unknown>(path: string, body?: any): Promise<T> {
    return $fetch<T>(`${API_BASE_URL}${path}`, {
      method: 'PATCH',
      headers: { ...authHeaders(), ...jsonHeaders(body) },
      body,
    })
  }

  async function del<T = unknown>(path: string): Promise<T> {
    return $fetch<T>(`${API_BASE_URL}${path}`, {
      method: 'DELETE',
      headers: { ...authHeaders() },
    })
  }

  return { get, post, patch, del }
}
