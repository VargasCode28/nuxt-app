
<script setup lang="ts">

import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'



const isOpen = useState('isRegisterModalOpen', () => false)
const isLoginOpen = useState('isLoginModalOpen')

const fullName = ref('')
const email = ref('')
const password = ref('')

const { register, isLoading, errorMessage } = useAuth()

const closeModal = () => {
  isOpen.value = false
  fullName.value = ''
  email.value = ''
  password.value = ''
}

const handleRegister = async () => {
  await register(
    { fullName: fullName.value, email: email.value, password: password.value },
    () => {
      closeModal()
    
      isLoginOpen.value = true
    }
  )
}

const openLogin = () => {
  closeModal()
  isLoginOpen.value = true
}
</script>

<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">

      <button class="close-btn" @click="closeModal">&times;</button>

      <h2 class="modal-title">Crear Cuenta</h2>
      <p class="modal-subtitle">Únete a nuestra comunidad botánica</p>

      <!-- Mensaje de error reactivo -->
      <div v-if="errorMessage" class="error-banner">
        {{ errorMessage }}
      </div>

      <form class="register-form" @submit.prevent="handleRegister">

        <div class="form-group">
          <label>Nombre completo:</label>
          <input
            v-model="fullName"
            type="text"
            placeholder="Juan Pérez"
            required
          />
        </div>

        <div class="form-group">
          <label>Email:</label>
          <input
            v-model="email"
            type="email"
            placeholder="tucorreo@ejemplo.com"
            required
          />
        </div>

        <div class="form-group">
          <label>Contraseña:</label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            required
            minlength="6"
          />
        </div>

        <button type="submit" class="btn-submit" :disabled="isLoading">
          {{ isLoading ? 'Creando cuenta...' : 'Registrarse' }}
        </button>
      </form>

      <p class="login-prompt">
        ¿Ya tienes cuenta? <span class="login-link" @click="openLogin">Inicia sesión aquí</span>
      </p>

    </div>
  </div>
</template>

<style scoped

src="/assets/css/register.css"
>

</style>