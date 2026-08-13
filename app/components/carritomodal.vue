
<script setup lang="ts">
// Controlamos el estado global del modal del carrito
const isOpen = useState('isCartModalOpen', () => false)

const closeModal = () => {
  isOpen.value = false
}
</script>

<template>
  <div v-if="isOpen" class="drawer-overlay" @click.self="closeModal">
    <div class="drawer-content">
      
      <!-- Botón de cerrar -->
      <button class="close-btn" @click="closeModal">&times;</button>

      <h2 class="drawer-title">Tu Carrito</h2>
      <p class="drawer-subtitle">Resumen de tus plantas seleccionadas</p>

      <!-- Lista de productos -->
      <div class="cart-items">
        <p class="empty-cart">Tu carrito está vacío</p>
      </div>

      <!-- Footer del drawer con botón de pago -->
      <div class="cart-footer">
        <button class="btn-submit" @click="closeModal">Proceder al pago</button>
      </div>

    </div>
  </div>
</template>




<style scoped>
/* Fondo oscuro translúcido cubriendo toda la pantalla */
.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: flex-end; /* Empuja el contenido completamente a la derecha */
  z-index: 1000;
}

/* Contenedor lateral deslizante */
.drawer-content {
  background: #ffffff;
  padding: 2.5rem;
  width: 100%;
  max-width: 400px;
  height: 100vh; /* Ocupa toda la altura de la pantalla */
  box-shadow: -5px 0 25px rgba(0, 0, 0, 0.05);
  position: relative;
  display: flex;
  flex-direction: column;
  animation: slideInRight 0.3s ease; /* Animación fluida de entrada */
}

/* Animación de deslizamiento lateral */
@keyframes slideInRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.close-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}

.drawer-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 0.5rem;
}

.drawer-subtitle {
  font-size: 0.9rem;
  color: #666;
}

/* Área de productos que ocupa el espacio intermedio flexible */
.cart-items {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  margin: 1.5rem 0;
}

.empty-cart {
  font-size: 0.9rem;
  color: #666;
}

.cart-footer {
  margin-top: auto;
}

.btn-submit {
  width: 100%;
  background-color: #111;
  color: #fff;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-submit:hover {
  background-color: #333;
}
</style>