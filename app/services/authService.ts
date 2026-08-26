export const authService = {
  login: (credentials: { email: string; password: string }) =>
    $fetch('/api/auth/login', { method: 'POST', body: credentials }),

  register: (data: { fullName: string; email: string; password: string }) =>
    $fetch('/api/auth/register', { method: 'POST', body: data }),

  logout: () => $fetch('/api/auth/logout', { method: 'POST' })
}
