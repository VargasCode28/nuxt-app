<script setup lang="ts">
defineProps<{
  product: {
    id: number
    name: string
    category: string
    price: string
    image: string
    description?: string
  } | null
  isOpen: boolean
}>()

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <div v-if="isOpen && product" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      
      <button class="close-btn" @click="closeModal">&times;</button>

      <div class="modal-image-placeholder">
        <span class="plant-icon">{{ product.image }}</span>
      </div>

      <div class="modal-details">
        <span class="product-category">{{ product.category }}</span>
        <h2 class="product-name">{{ product.name }}</h2>
        <p class="product-price">{{ product.price }}</p>
        
        <p class="product-description">
          {{ product.description || 'Una planta hermosa y de bajo mantenimiento, ideal para aportar vida y frescura a cualquier espacio interior o moderno.' }}
        </p>

        <button class="btn-add" @click="closeModal">Agregar al carrito</button>
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
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: #ffffff;
  width: 100%;
  max-width: 480px;
  border-radius: 8px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  animation: fadeInScale 0.25s ease;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  font-size: 1.5rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  color: #111;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.modal-image-placeholder {
  height: 240px;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.plant-icon {
  font-size: 4.5rem;
}

.modal-details {
  padding: 2rem;
}

.product-category {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #888;
  font-weight: 600;
}

.product-name {
  font-size: 1.35rem;
  font-weight: 700;
  color: #111;
  margin: 0.25rem 0 0.5rem 0;
}

.product-price {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.25rem;
}

.product-description {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.75rem;
}

.btn-add {
  width: 100%;
  background-color: #111;
  color: #fff;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-add:hover {
  background-color: #333;
}
</style>