<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

const { user, logout } = useAuth()

const handleLogout = async () => {
  await logout()
}
</script>

<template>
  <div class="admin-layout">
    <nav class="admin-navbar">
      <div class="admin-brand">
        <NuxtLink to="/admin" class="admin-logo">Clary Admin</NuxtLink>
      </div>

      <div class="admin-links">
        <NuxtLink to="/admin" class="admin-nav-item">Panel</NuxtLink>
        <NuxtLink to="/admin/productos" class="admin-nav-item">Plantas</NuxtLink>
      </div>

      <div class="admin-actions">
        <span v-if="user" class="admin-user-name">{{ user.fullName }}</span>
        <button @click="handleLogout" class="btn-logout">Cerrar sesión</button>
      </div>
    </nav>

    <main class="admin-content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.admin-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 3rem;
  background-color: #111111;
  color: #ffffff;
}

.admin-logo {
  color: #ffffff;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
}

.admin-links {
  display: flex;
  gap: 2rem;
}

.admin-nav-item {
  color: #cccccc;
  text-decoration: none;
  font-size: 0.9rem;
}

.admin-nav-item:hover,
.admin-nav-item.router-link-active {
  color: #ffffff;
}

.admin-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.admin-user-name {
  font-size: 0.85rem;
  color: #cccccc;
}

.btn-logout {
  background: transparent;
  color: #ffffff;
  border: 1px solid #444444;
  padding: 0.5rem 1.1rem;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
}

.btn-logout:hover {
  border-color: #ffffff;
}

.admin-content {
  padding: 2rem 3rem;
}
</style>