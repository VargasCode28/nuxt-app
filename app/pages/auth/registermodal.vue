<script setup lang="ts">
const isOpen = useState('isRegisterModalOpen', () => false)




const closeModal = () => {
isOpen.value = false
}

const handleRegister = () => {
console.log('Registrando usuario...')
closeModal()
}
</script>





<template>
<div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
    
    <button class="close-btn" @click="closeModal">&times;</button>

    <h2 class="modal-title">Crear Cuenta</h2>
    <p class="modal-subtitle">Únete a nuestra comunidad botánica</p>

    <form class="register-form" @submit.prevent="handleRegister">
        
        <div class="form-group">
        <label>Nombre completo:</label>
        <input type="text" placeholder="Juan Pérez" required />
        </div>

        <div class="form-group">
        <label>Email:</label>
        <input type="email" placeholder="tucorreo@ejemplo.com" required />
        </div>

        <div class="form-group">
        <label>Contraseña:</label>
        <input type="password" placeholder="••••••••" required />
        </div>

        <button type="submit" class="btn-submit">Registrarse</button>
    </form>

    <p class="login-prompt">
        ¿Ya tienes cuenta? <span class="login-link" @click="$emit('switch-to-login')">Inicia sesión aquí</span>
    </p>

    </div>
</div>
</template>





<style scoped>
/* Los estilos son idénticos a los del LoginModal para mantener coherencia visual */
.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background-color: rgba(0, 0, 0, 0.4); backdrop-filter: blur(4px);
  display: flex; justify-content: center; align-items: center; z-index: 1000;
}
.modal-content {
  background: #ffffff; padding: 2.5rem; width: 100%; max-width: 400px;
  border-radius: 8px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05); position: relative;
}
.close-btn {
  position: absolute; top: 1rem; right: 1.25rem; background: none; border: none;
  font-size: 1.5rem; cursor: pointer; color: #666;
}
.modal-title { font-size: 1.5rem; font-weight: 700; color: #111; margin-bottom: 0.5rem; }
.modal-subtitle { font-size: 0.9rem; color: #666; margin-bottom: 2rem; }
.form-group { margin-bottom: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem; }
.form-group label { font-size: 0.85rem; font-weight: 500; color: #333; }
.form-group input { 
  padding: 0.75rem; border: 1px solid #e0e0e0; border-radius: 4px; 
  font-size: 0.95rem; outline: none; transition: border-color 0.2s; 
}
.form-group input:focus { border-color: #111; }
.btn-submit { 
  width: 100%; background-color: #111; color: #fff; padding: 0.75rem; 
  border: none; border-radius: 4px; font-weight: 500; cursor: pointer; 
  margin-top: 1rem; transition: background-color 0.2s; 
}
.btn-submit:hover { background-color: #333; }
.login-prompt { margin-top: 1.5rem; text-align: center; font-size: 0.85rem; color: #666; }
.login-link { color: #111; font-weight: 600; cursor: pointer; }
.login-link:hover { text-decoration: underline; }
</style>