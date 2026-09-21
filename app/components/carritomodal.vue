
<script setup lang="ts">
import { computed, watch } from 'vue'
import { useCart } from '~/composables/useCart'
import { useCheckout } from '~/composables/useCheckout'



const isOpen = useState('isCartModalOpen', () => false)
const { cart, loadCart, removeFromCart, isLoading } = useCart()
const { pay, isProcessing, errorMessage, lastOrder } = useCheckout()

const isOrderModalOpen = useState('isOrderModalOpen', () => false)

const closeModal = () => {
  isOpen.value = false
}

const closeOrderModal = () => {
  isOrderModalOpen.value = false
}

watch(isOpen, (open) => {
  if (open) loadCart()
})

const total = computed(() => {
  if (!cart.value?.items) return 0
  return cart.value.items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)
})

const handleRemove = async (productId: string) => {
  await removeFromCart(productId)
}

const handlePay = async () => {
  const order = await pay()
  if (order) {
    isOpen.value = false
    isOrderModalOpen.value = true
  } else if (errorMessage.value) {
    alert(errorMessage.value)
  }
}

const isImageUrl = (value: string) => {
  return !!value && (value.startsWith('/') || value.startsWith('http'))
}
</script>

<template>
  <div v-if="isOpen" class="drawer-overlay" @click.self="closeModal">
    <div class="drawer-content">

      <button class="close-btn" @click="closeModal">&times;</button>

      <h2 class="drawer-title">Tu Carrito</h2>
      <p class="drawer-subtitle">Resumen de tus plantas seleccionadas</p>

      <div class="cart-items">
        <p v-if="isLoading" class="empty-cart">Cargando...</p>
        <p v-else-if="!cart?.items?.length" class="empty-cart">Tu carrito está vacío</p>

        <div v-else class="items-list">
          <div v-for="item in cart.items" :key="item.productId" class="cart-item">
            <img v-if="isImageUrl(item.image)" :src="item.image" :alt="item.name" class="item-photo" />
            <span v-else class="item-icon">{{ item.image || '🪴' }}</span>
            <div class="item-info">
              <p class="item-name">{{ item.name }}</p>
              <p class="item-meta">{{ item.quantity }} x ${{ item.price.toLocaleString('es-CL') }}</p>
            </div>
            <button class="item-remove" @click="handleRemove(item.productId)">&times;</button>
          </div>
        </div>
      </div>

      <div class="cart-footer">
        <div v-if="cart?.items?.length" class="cart-total">
          <span>Total</span>
          <span>${{ total.toLocaleString('es-CL') }}</span>
        </div>
        <button
          class="btn-submit"
          :disabled="!cart?.items?.length || isProcessing"
          @click="handlePay"
        >
          {{ isProcessing ? 'Procesando pago...' : 'Pagar' }}
        </button>
      </div>
  
    </div>
    
  </div>

  <ordermodal
    :isOpen="isOrderModalOpen"
    :order="lastOrder"
    @close="closeOrderModal"
  />
</template>




<style scoped src="~/assets/css/carritomodal.css"></style>









