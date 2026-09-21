
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




<style scoped src="~/assets/css/productomodal.css"></style>
