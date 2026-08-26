<!-- <script setup lang="ts">
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
</style> -->
























<!-- 
<script setup lang="ts">
import { useCart } from '~/composables/useCart'

const props = defineProps<{
  product: {
    _id: string
    name: string
    category: string
    price: string
    image: string
    description?: string
  } | null
  isOpen: boolean
}>()

const emit = defineEmits(['close'])

const { addToCart, isLoading, errorMessage } = useCart()

const closeModal = () => {
  emit('close')
}

const handleAddToCart = async () => {
  if (!props.product) return

  const ok = await addToCart(props.product)
  if (ok) {
    closeModal()
  } else if (errorMessage.value) {
    alert(errorMessage.value)
  }
}

const isImageUrl = (value: string) => {
  return !!value && (value.startsWith('/') || value.startsWith('http'))
}
</script>

<template>
  <div v-if="isOpen && product" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      
      <button class="close-btn" @click="closeModal">&times;</button>

      <div class="modal-image-placeholder">
        <img v-if="isImageUrl(product.image)" :src="product.image" :alt="product.name" class="product-photo" />
        <span v-else class="plant-icon">{{ product.image }}</span>
      </div>

      <div class="modal-details">
        <span class="product-category">{{ product.category }}</span>
        <h2 class="product-name">{{ product.name }}</h2>
        <p class="product-price">{{ product.price }}</p>
        
        <p class="product-description">
          {{ product.description || 'Una planta hermosa y de bajo mantenimiento, ideal para aportar vida y frescura a cualquier espacio interior o moderno.' }}
        </p>

        <button class="btn-add" @click="handleAddToCart" :disabled="isLoading">
          {{ isLoading ? 'Agregando...' : 'Agregar al carrito' }}
        </button>
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
  overflow: hidden;
}

.product-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

.btn-add:hover:not(:disabled) {
  background-color: #333;
}

.btn-add:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style> -->

































































<script setup lang="ts">
import { useCart } from '~/composables/useCart'

const props = defineProps<{
  product: {
    _id: string
    name: string
    category: string
    price: string
    image: string
    description?: string
  } | null
  isOpen: boolean
}>()

const emit = defineEmits(['close'])

const { addToCart, isLoading, errorMessage } = useCart()

const closeModal = () => {
  emit('close')
}

const handleAddToCart = async () => {
  if (!props.product) return

  const ok = await addToCart(props.product)
  if (ok) {
    closeModal()
  } else if (errorMessage.value) {
    alert(errorMessage.value)
  }
}

const isImageUrl = (value: string) => {
  return !!value && (value.startsWith('/') || value.startsWith('http'))
}
</script>

<template>
  <div v-if="isOpen && product" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">

      <button class="close-btn" @click="closeModal" aria-label="Cerrar">&times;</button>

      <div class="modal-image-placeholder">
        <img v-if="isImageUrl(product.image)" :src="product.image" :alt="product.name" class="product-photo" />
        <span v-else class="plant-icon">{{ product.image }}</span>
        <span class="price-tag">{{ product.price }}</span>
      </div>

      <div class="modal-details">
        <span class="product-category">{{ product.category }}</span>
        <h2 class="product-name">{{ product.name }}</h2>

        <p class="product-description">
          {{ product.description || 'Una planta hermosa y de bajo mantenimiento, ideal para aportar vida y frescura a cualquier espacio interior o moderno.' }}
        </p>

        <button class="btn-add" @click="handleAddToCart" :disabled="isLoading">
          {{ isLoading ? 'Agregando...' : 'Agregar al carrito' }}
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,450;9..144,600&family=Inter:wght@400;500;600&display=swap');

.modal-overlay {
  --ink: #1b2b21;
  --forest: #2c4a3e;
  --moss: #6b8a72;
  --cream: #faf8f2;
  --paper: #f2efe6;
  --gold: #b8863b;
  --gold-light: #e9d6ab;

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(27, 43, 33, 0.45);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  font-family: 'Inter', system-ui, sans-serif;
  background: var(--cream);
  width: 100%;
  max-width: 480px;
  max-height: 88vh;
  display: flex;
  flex-direction: column;
  /* misma esquina orgánica asimétrica que las tarjetas del catálogo */
  border-radius: 6px 32px 6px 32px;
  box-shadow: 0 25px 60px rgba(27, 43, 33, 0.22);
  position: relative;
  overflow: hidden;
  animation: fadeInScale 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.96) translateY(8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(250, 248, 242, 0.9);
  backdrop-filter: blur(4px);
  border: none;
  font-size: 1.4rem;
  line-height: 1;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  color: var(--ink);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.close-btn:hover {
  background: #ffffff;
  transform: rotate(90deg);
}

.close-btn:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 2px;
}

.modal-image-placeholder {
  position: relative;
  height: 200px;
  flex-shrink: 0;
  background-color: var(--paper);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.product-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.plant-icon {
  font-size: 4.5rem;
}

.price-tag {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: var(--gold);
  color: var(--cream);
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.4rem 0.9rem;
  border-radius: 3px 12px 3px 12px;
  box-shadow: 0 3px 10px rgba(184, 134, 59, 0.35);
}

.modal-details {
  padding: 1.75rem 2rem 1.75rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.product-category {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--moss);
  font-weight: 600;
}

.product-name {
  font-family: 'Fraunces', serif;
  font-size: 1.6rem;
  font-weight: 450;
  color: var(--ink);
  margin: 0.4rem 0 0.9rem 0;
  letter-spacing: -0.01em;
}

.product-description {
  font-size: 0.92rem;
  color: var(--moss);
  line-height: 1.7;
  margin-bottom: 1.85rem;
}

.btn-add {
  flex-shrink: 0;
  width: 100%;
  background-color: var(--forest);
  color: var(--cream);
  padding: 0.85rem;
  border: 1px solid var(--forest);
  border-radius: 24px;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: background-color 0.25s ease, border-color 0.25s ease;
}

.btn-add:hover:not(:disabled) {
  background-color: var(--gold);
  border-color: var(--gold);
}

.btn-add:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 3px;
}

.btn-add:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

@media (prefers-reduced-motion: reduce) {
  .modal-content,
  .close-btn,
  .btn-add {
    animation: none;
    transition: none;
  }
}

@media (max-width: 480px) {
  .modal-overlay {
    padding: 0.75rem;
    align-items: flex-end;
  }

  .modal-content {
    max-height: 92vh;
  }

  .modal-image-placeholder {
    height: 150px;
  }

  .modal-details {
    padding: 1.4rem 1.5rem 1.5rem;
  }

  .product-name {
    font-size: 1.35rem;
  }
}
</style>