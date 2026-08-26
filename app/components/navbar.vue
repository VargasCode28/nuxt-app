

<script setup lang="ts">

import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuth } from '~/composables/useAuth'


const isLoginModalOpen = useState('isLoginModalOpen')
const isCartModalOpen = useState('isCartModalOpen')
const { user, logout, fetchUser } = useAuth()


await fetchUser()

const openLogin = () => {
  isLoginModalOpen.value = true
}

const openCart = () => {
  isCartModalOpen.value = true
}

const handleLogout = async () => {
  isProfileOpen.value = false
  await logout()
}

const isProfileOpen = ref(false)
const profileRef = ref<HTMLElement | null>(null)

const toggleProfile = () => {
  isProfileOpen.value = !isProfileOpen.value
}

const closeProfile = () => {
  isProfileOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (profileRef.value && !profileRef.value.contains(event.target as Node)) {
    isProfileOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const initials = computed(() => {
  if (!user.value?.fullName) return '?'
  return user.value.fullName
    .split(' ')
    .map((n: string) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
})



const scrollToContact = (event: MouseEvent) => {
  event.preventDefault()
  const el = document.getElementById('contact')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } else {
    navigateTo('/cliente/productos#contact')
  }
}
</script>

<template>
  <nav class="navbar">

    <div class="navbar-brand">
      <NuxtLink to="/" class="logo-link">
        <img src="/clary_logo.png" alt="Clary Natural Beauty" class="logo-image" />
      </NuxtLink>
    </div>

    <div class="navbar-links">
      <NuxtLink to="/cliente/productos" class="nav-item">Catálogo</NuxtLink>
      <a href="#contact" class="nav-item" @click="scrollToContact">Contacto</a>
    </div>

    <div class="navbar-actions">
      <button @click="openCart" class="btn-cart" aria-label="Ver carrito" title="Carrito">
        <svg class="cart-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 4H5L5.4 6M5.4 6H21L18.5 14H7.5M5.4 6L7 14H18.5M7.5 14L6.3 17H19" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="9.5" cy="20" r="1.4" fill="currentColor"/>
          <circle cx="18" cy="20" r="1.4" fill="currentColor"/>
        </svg>
      </button>

      <div v-if="user" class="profile-wrapper" ref="profileRef">
        <button class="profile-trigger" @click.stop="toggleProfile">
          <span class="profile-avatar">{{ initials }}</span>
          <span class="profile-name">{{ user.fullName }}</span>
        </button>

        <div v-if="isProfileOpen" class="profile-dropdown">
          <div class="dropdown-header">
            <span class="dropdown-avatar">{{ initials }}</span>
            <div>
              <p class="dropdown-name">{{ user.fullName }}</p>
              <p class="dropdown-email">{{ user.email }}</p>
            </div>
          </div>

          <div class="dropdown-divider"></div>

          <NuxtLink to="/cliente/perfil" class="dropdown-item" @click="closeProfile">
            Mi perfil
          </NuxtLink>
          <NuxtLink to="/cliente/pedidos" class="dropdown-item" @click="closeProfile">
            Mis pedidos
          </NuxtLink>

          <div class="dropdown-divider"></div>

          <button class="dropdown-item dropdown-logout" @click="handleLogout">
            Cerrar sesión
          </button>
        </div>
      </div>

      <button v-else @click="openLogin" class="btn-login">
        <span>Acceso</span>
      </button>
    </div>

  </nav>
</template>

<style scoped src="~/assets/css/navbar.css">
</style>

<style scoped>
.btn-cart {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 50%;
  color: #1b2b21;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.btn-cart:hover {
  background-color: #f5f5f5;
}

.btn-cart:focus-visible {
  outline: 2px solid #b8863b;
  outline-offset: 2px;
}

.cart-icon {
  width: 21px;
  height: 21px;
}

.profile-wrapper {
  position: relative;
}

.profile-trigger {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.3rem 0.5rem 0.3rem 0.3rem;
  border-radius: 24px;
  transition: background-color 0.2s ease;
}

.profile-trigger:hover {
  background-color: #f5f5f5;
}

.profile-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #111;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
}

.profile-name {
  font-size: 0.85rem;
  color: #333;
  font-weight: 500;
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.profile-dropdown {
  position: absolute;
  top: calc(100% + 0.6rem);
  right: 0;
  background: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  width: 260px;
  z-index: 1200;
  overflow: hidden;
  animation: dropdownFade 0.15s ease;
}

@keyframes dropdownFade {
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
}

.dropdown-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
}

.dropdown-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #111;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 600;
  flex-shrink: 0;
}

.dropdown-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #111;
  margin: 0;
}

.dropdown-email {
  font-size: 0.75rem;
  color: #888;
  margin: 0.15rem 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 170px;
}

.dropdown-divider {
  height: 1px;
  background-color: #f0f0f0;
}

.dropdown-item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  font-size: 0.85rem;
  color: #333;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.dropdown-item:hover {
  background-color: #fafafa;
}

.dropdown-logout {
  color: #991b1b;
}

.dropdown-logout:hover {
  background-color: #fdf2f2;
}
</style>
