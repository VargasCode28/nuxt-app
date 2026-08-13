// export default defineNuxtRouteMiddleware((to, from) => {

//   const isAuthenticated = false; 
//   const userRole = 'admin'; 

//   const isProtectedRoute = to.path.startsWith('/admin') || to.path.startsWith('/cliente');

//   if (isProtectedRoute && !isAuthenticated) {
//     return navigateTo('/auth/login');
//   }

//   if (to.path === '/') {
//     if (!isAuthenticated) {
//       return navigateTo('/auth/login');
//     }
//     return userRole === 'admin' ? navigateTo('/admin') : navigateTo('/cliente');
//   }
// })












export default defineNuxtRouteMiddleware((to, from) => {
  // SIMULACIÓN DE DATOS
  const isAuthenticated = false; // Cambia a true para probar
  const userRole = 'admin'; // Puede ser 'admin' o 'cliente'

  // 1. Solo protegemos estrictamente el panel de administración
  const isProtectedRoute = to.path.startsWith('/admin');

  // 2. Si intenta entrar a una ruta protegida (admin) y no tiene sesión, al login
  if (isProtectedRoute && !isAuthenticated) {
    return navigateTo('/auth/login');
  }

  // 3. Lógica para la raíz ('/'): redirige automáticamente al inicio de tu tienda/clientes
  if (to.path === '/') {
    return navigateTo('/cliente');
  }
})