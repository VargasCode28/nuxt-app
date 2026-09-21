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
        <NuxtLink to="/admin" class="admin-logo">
          <span class="admin-logo-mark">C</span>
          <span><strong>Clary</strong><small>Administración</small></span>
        </NuxtLink>
      </div>

      <div class="admin-links">
        <NuxtLink to="/admin" class="admin-nav-item">Panel</NuxtLink>
        <NuxtLink to="/admin/productos" class="admin-nav-item">Plantas</NuxtLink>
      </div>

      <div class="admin-actions">
        <span v-if="user" class="admin-user-name">
          <small>Sesión activa</small>
          {{ user.fullName }}
        </span>
        <button @click="handleLogout" class="btn-logout">Cerrar sesión</button>
      </div>
    </nav>

    <main class="admin-content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.admin-layout {
  --admin-ink: #18231d;
  --admin-muted: #6a776e;
  --admin-border: #dfe7e1;
  --admin-surface: #ffffff;
  --admin-page: #f4f7f4;
  --admin-accent: #245b45;
  min-height: 100vh;
  background: var(--admin-page);
  color: var(--admin-ink);
}

.admin-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 72px;
  padding: 0.7rem clamp(1rem, 4vw, 4rem);
  background: #ffffff;
  border-bottom: 1px solid var(--admin-border);
  box-shadow: 0 3px 14px rgba(24, 35, 29, 0.04);
  color: #ffffff;
}

.admin-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  color: var(--admin-ink);
  text-decoration: none;
  font-size: 1rem;
  letter-spacing: -0.01em;
}

.admin-logo strong,
.admin-logo small {
  display: block;
}

.admin-logo small {
  margin-top: 0.12rem;
  color: var(--admin-muted);
  font-size: 0.66rem;
  font-weight: 500;
  letter-spacing: 0.03em;
}

.admin-logo-mark {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: var(--admin-accent);
  color: #ffffff;
  font-family: Georgia, serif;
  font-size: 1.15rem;
}

.admin-links {
  display: flex;
  gap: 0.35rem;
}

.admin-nav-item {
  padding: 0.6rem 0.85rem;
  border-radius: 6px;
  color: var(--admin-muted);
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 650;
  transition: color 0.2s ease, background-color 0.2s ease;
}

.admin-nav-item:hover,
.admin-nav-item.router-link-active {
  color: var(--admin-accent);
  background: #edf5f0;
}

.admin-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.admin-user-name {
  display: flex;
  flex-direction: column;
  gap: 0.12rem;
  color: var(--admin-ink);
  font-size: 0.8rem;
  font-weight: 650;
}

.admin-user-name small {
  color: var(--admin-muted);
  font-size: 0.62rem;
  font-weight: 500;
}

.btn-logout {
  background: #ffffff;
  color: #7b3932;
  border: 1px solid #e7c9c5;
  padding: 0.55rem 0.85rem;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 650;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.btn-logout:hover {
  background: #fff3f1;
  border-color: #c9877e;
}

.admin-content {
  width: min(1240px, calc(100% - 2rem));
  margin: 0 auto;
  padding: clamp(1.5rem, 4vw, 3rem) 0 4rem;
}

@media (max-width: 680px) {
  .admin-navbar {
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 0.6rem;
  }

  .admin-links {
    order: 3;
    width: 100%;
  }

  .admin-actions {
    margin-left: auto;
  }

  .admin-user-name {
    display: none;
  }
}
</style>