<script setup lang="ts">



import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'



const isOpen = useState('isLoginModalOpen', () => false)
const isRegisterOpen = useState('isRegisterModalOpen')

const email = ref('')
const password = ref('')

const { login, isLoading, errorMessage } = useAuth()

const closeModal = () => {
  isOpen.value = false
  email.value = ''
  password.value = ''
}

const handleLogin = async () => {
  await login(
    { email: email.value, password: password.value },
    (response) => {
      closeModal()
      // Redirige según el rol devuelto por el backend
      if (response.role === 'ADMIN') {
        navigateTo('/admin')
      } else {
        navigateTo('/cliente')
      }
    }
  )
}

const openRegister = () => {
  closeModal() 
  isRegisterOpen.value = true 
}
</script>

<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      
      <button class="close-btn" @click="closeModal">&times;</button>

      <h2 class="modal-title">Acceso Operativo</h2>
      <p class="modal-subtitle">Ingresa tus credenciales para continuar</p>

      <!-- Mensaje de error reactivo -->
      <div v-if="errorMessage" class="error-banner">
        {{ errorMessage }}
      </div>

      <form class="login-form" @submit.prevent="handleLogin">
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
          />
        </div>

        <button type="submit" class="btn-submit" :disabled="isLoading">
          {{ isLoading ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>

      <p class="register-prompt">
        ¿Aún no tienes cuenta? 
        <span class="register-link" @click="openRegister">Regístrate aquí</span>
      </p>

    </div>
  </div>
</template>

<style scoped


src="~/assets/css/login.css">

</style>

