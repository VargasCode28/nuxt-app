<!-- 
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
            <span class="item-icon">{{ item.image || '🪴' }}</span>
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
        <button></button>
        

      </div>
<br>
<br>

    </div>
  </div>

  <ordermodal
    :isOpen="isOrderModalOpen"
    :order="lastOrder"
    @close="closeOrderModal"
  />
</template>

<style scoped>
.drawer-overlay {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background-color: rgba(0, 0, 0, 0.4); backdrop-filter: blur(4px);
  display: flex; justify-content: flex-end; z-index: 1000;
}
.drawer-content {
  background: #ffffff; padding: 2.5rem; width: 100%; max-width: 400px;
  height: 100vh; box-shadow: -5px 0 25px rgba(0, 0, 0, 0.05); position: relative;
  display: flex; flex-direction: column; animation: slideInRight 0.3s ease;
}
@keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
.close-btn {
  position: absolute; top: 1.5rem; right: 1.5rem; background: none; border: none;
  font-size: 1.5rem; cursor: pointer; color: #666;
}
.drawer-title { font-size: 1.5rem; font-weight: 700; color: #111; margin-bottom: 0.5rem; }
.drawer-subtitle { font-size: 0.9rem; color: #666; }

.cart-items {
  flex: 1; display: flex; flex-direction: column; justify-content: center;
  border-top: 1px solid #f0f0f0; border-bottom: 1px solid #f0f0f0; margin: 1.5rem 0;
  overflow-y: auto;
}
.empty-cart { font-size: 0.9rem; color: #666; text-align: center; }

.items-list { display: flex; flex-direction: column; gap: 1rem; padding: 1rem 0; }
.cart-item { display: flex; align-items: center; gap: 0.85rem; }
.item-icon { font-size: 1.75rem; }
.item-info { flex: 1; }
.item-name { font-size: 0.9rem; font-weight: 500; color: #111; margin: 0; }
.item-meta { font-size: 0.8rem; color: #777; margin: 0.15rem 0 0; }
.item-remove {
  background: none; border: none; font-size: 1.2rem; color: #999; cursor: pointer;
}
.item-remove:hover { color: #991b1b; }

.cart-footer { margin-top: auto; }
.cart-total {
  display: flex; justify-content: space-between; font-size: 0.95rem;
  font-weight: 600; color: #111; margin-bottom: 1rem;
}

.btn-submit {
  width: 100%; background-color: #111; color: #fff; padding: 0.75rem;
  border: none; border-radius: 4px; font-weight: 500; cursor: pointer;
  transition: background-color 0.2s;
}
.btn-submit:hover:not(:disabled) { background-color: #333; }
.btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
</style> -->









































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
        <button></button>
        <br>
        <br>
        <br>
        
      </div>
  
    </div>
    
  </div>

  <ordermodal
    :isOpen="isOrderModalOpen"
    :order="lastOrder"
    @close="closeOrderModal"
  />
</template>

<style scoped>
.drawer-overlay {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background-color: rgba(0, 0, 0, 0.4); backdrop-filter: blur(4px);
  display: flex; justify-content: flex-end; z-index: 1000;
}
.drawer-content {
  background: #ffffff; padding: 2.5rem; width: 100%; max-width: 400px;
  height: 100vh; box-shadow: -5px 0 25px rgba(0, 0, 0, 0.05); position: relative;
  display: flex; flex-direction: column; animation: slideInRight 0.3s ease;
}
@keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
.close-btn {
  position: absolute; top: 1.5rem; right: 1.5rem; background: none; border: none;
  font-size: 1.5rem; cursor: pointer; color: #666;
}
.drawer-title { font-size: 1.5rem; font-weight: 700; color: #111; margin-bottom: 0.5rem; }
.drawer-subtitle { font-size: 0.9rem; color: #666; }

.cart-items {
  flex: 1; display: flex; flex-direction: column; justify-content: center;
  border-top: 1px solid #f0f0f0; border-bottom: 1px solid #f0f0f0; margin: 1.5rem 0;
  overflow-y: auto;
}
.empty-cart { font-size: 0.9rem; color: #666; text-align: center; }

.items-list { display: flex; flex-direction: column; gap: 1rem; padding: 1rem 0; }
.cart-item { display: flex; align-items: center; gap: 0.85rem; }
.item-icon { font-size: 1.75rem; }
.item-photo {
  width: 42px;
  height: 42px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
}
.item-info { flex: 1; }
.item-name { font-size: 0.9rem; font-weight: 500; color: #111; margin: 0; }
.item-meta { font-size: 0.8rem; color: #777; margin: 0.15rem 0 0; }
.item-remove {
  background: none; border: none; font-size: 1.2rem; color: #999; cursor: pointer;
}
.item-remove:hover { color: #991b1b; }

.cart-footer { margin-top: auto; }
.cart-total {
  display: flex; justify-content: space-between; font-size: 0.95rem;
  font-weight: 600; color: #111; margin-bottom: 1rem;
}

.btn-submit {
  width: 100%; background-color: #111; color: #fff; padding: 0.75rem;
  border: none; border-radius: 4px; font-weight: 500; cursor: pointer;
  transition: background-color 0.2s;
}
.btn-submit:hover:not(:disabled) { background-color: #333; }
.btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
</style>