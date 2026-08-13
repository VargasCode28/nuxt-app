<script setup lang="ts">
// Vinculamos los estados globales de los modales
const isLoginModalOpen = useState('isLoginModalOpen')
const isCartModalOpen = useState('isCartModalOpen')

const openLogin = () => {
  isLoginModalOpen.value = true
}

const openCart = () => {
  isCartModalOpen.value = true
}



</script>

<template>
  <nav class="navbar">
    
    <!-- Bloque 1: Logotipo -->
    <div class="navbar-brand">
      <NuxtLink to="/" class="logo">LOGO</NuxtLink>
    </div>

    <!-- Bloque 2: Enlaces de navegación -->
    <div class="navbar-links">
      <NuxtLink to="/cliente/productos" class="nav-item">Nuestros Productos</NuxtLink>
      <NuxtLink to="/cliente/contacto" class="nav-item">Contactanos</NuxtLink>
    </div>

    <!-- Bloque 3: Acciones de usuario (Aquí deben estar ambos botones) -->
    <div class="navbar-actions">
      <button @click="openCart" class="btn-cart">Carrito</button>
      <button @click="openLogin" class="btn-login">Login</button>
    </div>

  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 3rem;
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0; 
}

.logo {
  font-weight: 700;
  font-size: 1.25rem;
  text-decoration: none;
  color: #111111;
  letter-spacing: 1px;
}

.navbar-links {
  display: flex;
  gap: 2.5rem;
}

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

/* Contenedor de los botones a la derecha */
.navbar-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

/* Botón de carrito */
.btn-cart {
  background: transparent;
  color: #111111;
  border: 1px solid #e0e0e0;
  padding: 0.5rem 1.25rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-cart:hover {
  border-color: #111111;
}

/* Botón de login */
.btn-login {
  background-color: #111111;
  color: #ffffff;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s ease;
}

.btn-login:hover {
  background-color: #333333;
}
</style>