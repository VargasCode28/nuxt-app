
<script setup lang="ts">
// Vinculamos al mismo estado global del modal
const isLoginModalOpen = useState('isLoginModalOpen')

const openLogin = () => {
  isLoginModalOpen.value = true
}
</script>









<template>
  <nav class="navbar">
    
    <!-- Bloque 1: Logotipo -->
    <div class="navbar-brand">
      <NuxtLink to="/" class="logo">
        <!-- Puedes reemplazar el texto por tu etiqueta <img> más adelante -->
        LOGO
      </NuxtLink>
    </div>

    <!-- Bloque 2: Enlaces de navegación -->
    <div class="navbar-links">
      <NuxtLink to="/cliente/productos" class="nav-item">Products</NuxtLink>
      <NuxtLink to="/cliente/contacto" class="nav-item">Contactanos</NuxtLink>
    </div>







    <!-- Bloque 3: Acciones de usuario -->
    <div class="navbar-actions">
      <!-- <NuxtLink to="/auth/login" class="btn-login">Login</NuxtLink> -->
       <button  @click="openLogin" class="btn-login">Login</button>
    </div>

  </nav>
</template>

















<style scoped>
/* Estructura principal */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 3rem;
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0; 
}

/* Estilo del Logotipo */
.logo {
  font-weight: 700;
  font-size: 1.25rem;
  text-decoration: none;
  color: #111111;
  letter-spacing: 1px;
}

/* Contenedor de enlaces */
.navbar-links {
  display: flex;
  gap: 2.5rem;
}

/* Efectos sutiles en los enlaces */
.nav-item {
  text-decoration: none;
  color: #666666;
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-item:hover {
  color: #111111;
}

/* Botón de acceso profesional */
.btn-login {
  text-decoration: none;
  background-color: #111111;
  color: #ffffff;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.btn-login:hover {
  background-color: #333333;
}
</style>