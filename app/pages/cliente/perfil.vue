<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAuth } from '~/composables/useAuth'

const { user, fetchUser } = useAuth()
await fetchUser()

const isLoginModalOpen = useState('isLoginModalOpen')
const isEditing = ref(false)
const form = ref({
  fullName: user.value?.fullName ?? '',
  email: user.value?.email ?? '',
  password: ''
})

const openLogin = () => {
  isLoginModalOpen.value = true
}

const startEditing = () => {
  if (!user.value) return
  form.value = {
    fullName: user.value.fullName,
    email: user.value.email,
    password: ''
  }
  isEditing.value = true
}

const cancelEditing = () => {
  isEditing.value = false
  form.value = {
    fullName: user.value?.fullName ?? '',
    email: user.value?.email ?? '',
    password: ''
  }
}

const saveProfile = async () => {
  if (!user.value) return

  try {
    await $fetch('/api/auth/me', {
      method: 'PUT',
      body: {
        fullName: form.value.fullName.trim(),
        email: form.value.email.trim(),
        password: form.value.password.trim() || undefined
      }
    })

    await fetchUser()
    isEditing.value = false
  } catch (error: any) {
    alert(error?.data?.statusMessage || 'No se pudo actualizar el perfil.')
  }
}

const initials = computed(() => {
  if (!user.value?.fullName) return '?'
  return user.value.fullName
    .split(' ')
    .map((part: string) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
})

const createdAtText = computed(() => {
  if (!user.value?.createdAt) return 'Sin información'
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date(user.value.createdAt))
})
</script>

<template>
  <div class="profile-page">
    <div v-if="user" class="profile-shell">
      <aside class="profile-card summary-card">
        <div class="avatar">{{ initials }}</div>
        <h1>{{ user.fullName }}</h1>
        <p class="email">{{ user.email }}</p>
        <span class="role-pill">{{ user.role === 'ADMIN' ? 'Administrador' : 'Cliente' }}</span>
      </aside>

      <section class="profile-card content-card">
        <div class="section-header">
          <span class="eyebrow">Cuenta</span>
          <h2>Mi perfil</h2>
        </div>

        <div v-if="!isEditing" class="info-grid">
          <div class="info-item">
            <span class="label">Nombre completo</span>
            <strong>{{ user.fullName }}</strong>
          </div>

          <div class="info-item">
            <span class="label">Correo</span>
            <strong>{{ user.email }}</strong>
          </div>

          <div class="info-item">
            <span class="label">Miembro desde</span>
            <strong>{{ createdAtText }}</strong>
          </div>

          <div class="info-item">
            <span class="label">Tipo de cuenta</span>
            <strong>{{ user.role === 'ADMIN' ? 'Administrador' : 'Cliente' }}</strong>
          </div>
        </div>

        <form v-else class="edit-form" @submit.prevent="saveProfile">
          <div class="field-group">
            <label for="fullName">Nombre completo</label>
            <input id="fullName" v-model="form.fullName" type="text" required />
          </div>

          <div class="field-group">
            <label for="email">Correo</label>
            <input id="email" v-model="form.email" type="email" required />
          </div>

          <div class="field-group">
            <label for="password">Nueva contraseña</label>
            <input id="password" v-model="form.password" type="password" placeholder="Opcional" />
          </div>

          <div class="form-actions">
            <button type="submit" class="primary-action">Guardar cambios</button>
            <button type="button" class="secondary-action" @click="cancelEditing">Cancelar</button>
          </div>
        </form>

        <div class="actions-row">
          <button v-if="!isEditing" class="primary-action" @click="startEditing">Editar perfil</button>
          <NuxtLink to="/cliente/pedidos" class="secondary-action">Ver mis pedidos</NuxtLink>
        </div>
      </section>
    </div>

    <div v-else class="empty-state">
      <h1>Inicia sesión para ver tu perfil</h1>
      <p>Necesitas tener una sesión activa para acceder a esta sección.</p>
      <button class="primary-action" @click="openLogin">Entrar</button>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  max-width: 1040px;
  margin: 0 auto;
  padding: 3rem 1.25rem 4rem;
}

.profile-shell {
  display: grid;
  grid-template-columns: minmax(260px, 320px) minmax(0, 1fr);
  gap: 1.5rem;
}

.profile-card {
  background: #fff;
  border: 1px solid #e4e9e5;
  border-radius: 18px;
  box-shadow: 0 12px 28px rgba(24, 35, 29, 0.05);
}

.summary-card {
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.avatar {
  width: 86px;
  height: 86px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #245b45, #6a8a72);
  color: #fff;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.summary-card h1 {
  margin: 1rem 0 0.35rem;
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: #18231d;
}

.email {
  margin: 0;
  color: #67756d;
}

.role-pill {
  margin-top: 1rem;
  padding: 0.45rem 0.8rem;
  border-radius: 999px;
  background: #edf5f0;
  color: #245b45;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.content-card {
  padding: 1.75rem;
}

.section-header {
  margin-bottom: 1.5rem;
}

.eyebrow {
  display: inline-block;
  color: #245b45;
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  font-weight: 700;
  text-transform: uppercase;
}

.section-header h2 {
  margin: 0.55rem 0 0;
  color: #18231d;
  font-size: clamp(1.6rem, 2.6vw, 2.2rem);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(220px, 1fr));
  gap: 1rem;
}

.info-item {
  background: #f7faf8;
  border: 1px solid #edf1ee;
  border-radius: 12px;
  padding: 1rem;
}

.label {
  display: block;
  color: #6b7b71;
  font-size: 0.75rem;
  margin-bottom: 0.4rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.info-item strong {
  color: #18231d;
  font-size: 1rem;
  line-height: 1.5;
}

.edit-form {
  display: grid;
  gap: 1rem;
}

.field-group {
  display: grid;
  gap: 0.45rem;
}

.field-group label {
  color: #2d4039;
  font-weight: 600;
}

.field-group input {
  width: 100%;
  border: 1px solid #dfe7e1;
  border-radius: 10px;
  padding: 0.8rem 0.9rem;
  font: inherit;
  background: #fff;
}

.field-group input:focus {
  outline: 2px solid rgba(36, 91, 69, 0.18);
  border-color: #245b45;
}

.actions-row,
.form-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 1.2rem;
}

.primary-action,
.secondary-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.2rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
}

.primary-action {
  background: #245b45;
  border: 1px solid #245b45;
  color: #fff;
}

.secondary-action {
  background: #fff;
  border: 1px solid #dfe7e1;
  color: #1b2b21;
}

.empty-state {
  max-width: 540px;
  margin: 4rem auto 0;
  text-align: center;
  padding: 2.5rem 1.5rem;
  border: 1px solid #e4e9e5;
  border-radius: 18px;
  background: #fff;
}

.empty-state h1 {
  margin-top: 0;
  color: #18231d;
}

.empty-state p {
  color: #67756d;
  margin-bottom: 1.5rem;
}

@media (max-width: 720px) {
  .profile-shell,
  .info-grid {
    grid-template-columns: 1fr;
  }

  .profile-page {
    padding-top: 2rem;
  }
}
</style>
