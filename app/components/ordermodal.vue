<script setup lang="ts">
defineProps<{
  isOpen: boolean
  order: {
    orderId: string
    total: number
    status?: string
    createdAt?: string
  } | null
  
}>()



const emit = defineEmits(['close'])



const closeModal = () => {
  emit('close')
}
</script>

<template>
  <div v-if="isOpen && order" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">

      <button class="close-btn" @click="closeModal">&times;</button>

      <div class="success-view">
        <span class="success-icon">✓</span>
        <h2 class="modal-title">¡Pago exitoso!</h2>
        <p class="modal-subtitle">Tu pedido fue confirmado</p>

        <div class="order-summary">
          <div class="order-row">
            <span>N° de orden</span>
            <span class="order-id">{{ order.orderId }}</span>
          </div>
          <div class="order-row">
            <span>Total pagado</span>
            <span>${{ order.total?.toLocaleString('es-CL') }}</span>
          </div>
          <div v-if="order.status" class="order-row">
            <span>Estado</span>
            <span class="order-status">{{ order.status }}</span>
          </div>
        </div>

        <button class="btn-submit" @click="closeModal">Cerrar</button>
      </div>

    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
  padding: 1rem;
}

.modal-content {
  background: #ffffff;
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
  position: relative;
  padding: 2.5rem;
  animation: fadeInScale 0.25s ease;
}

@keyframes fadeInScale {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1.25rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}

.success-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.success-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #111;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.modal-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 0.35rem;
}

.modal-subtitle {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.order-summary {
  width: 100%;
  background-color: #fafafa;
  border-radius: 6px;
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
}

.order-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #444;
  padding: 0.35rem 0;
}

.order-id {
  font-family: monospace;
  font-size: 0.75rem;
  color: #666;
}

.order-status {
  text-transform: capitalize;
  font-weight: 600;
  color: #15803d;
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