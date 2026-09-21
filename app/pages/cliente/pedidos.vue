<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuth } from '~/composables/useAuth'

const { user, fetchUser } = useAuth()
await fetchUser()

const isLoginModalOpen = useState('isLoginModalOpen')
const openLogin = () => {
  isLoginModalOpen.value = true
}

const orders = ref<any[]>([])
const isLoading = ref(false)
const selectedStatus = ref<'all' | 'pagado' | 'pendiente' | 'fallido'>('all')
const expandedOrders = ref<Record<string, boolean>>({})

const normalizeStatus = (status?: string) => {
  const value = String(status ?? '').toLowerCase()
  const map: Record<string, string> = {
    pagado: 'pagado',
    aprobado: 'pagado',
    approved: 'pagado',
    pendiente: 'pendiente',
    pending: 'pendiente',
    fallido: 'fallido',
    failed: 'fallido'
  }
  return map[value] ?? (value || 'pendiente')
}

const fetchOrders = async () => {
  if (!user.value) {
    orders.value = []
    return
  }

  isLoading.value = true
  try {
    const response = await $fetch('/api/orders')
    orders.value = Array.isArray(response) ? response : []
  } catch (error: any) {
    orders.value = []
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

await fetchOrders()

const statusLabel = (status: string) => {
  const map: Record<string, string> = {
    pagado: 'Pagado',
    pendiente: 'Pendiente',
    fallido: 'Fallido'
  }
  return map[normalizeStatus(status)] ?? normalizeStatus(status)
}

const formatPrice = (value: number) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(value)
}

const formatDate = (value?: string) => {
  if (!value) return 'Sin fecha'
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(new Date(value))
}

const getOrderKey = (order: any) => String(order?.id ?? order?._id ?? order?.orderId ?? 'sin-id')

const filteredOrders = computed(() => {
  if (selectedStatus.value === 'all') return orders.value
  return orders.value.filter((order) => normalizeStatus(order.status) === selectedStatus.value)
})

const totalOrders = computed(() => orders.value.length)

const toggleOrderDetails = (orderId: string) => {
  expandedOrders.value[orderId] = !expandedOrders.value[orderId]
}

const isOrderExpanded = (orderId: string) => Boolean(expandedOrders.value[orderId])
</script>

<template>
  <div class="orders-page">
    <div v-if="user" class="orders-shell">
      <header class="page-header">
        <div>
          <span class="eyebrow">Compras</span>
          <h1>Mis pedidos</h1>
        </div>
        <span class="orders-count">{{ totalOrders }} pedidos</span>
      </header>

      <div class="filter-bar" aria-label="Filtrar pedidos por estado">
        <button
          v-for="option in ['all', 'pagado', 'pendiente', 'fallido']"
          :key="option"
          class="filter-chip"
          :class="{ active: selectedStatus === option }"
          @click="selectedStatus = option"
        >
          {{ option === 'all' ? 'Todos' : statusLabel(option) }}
        </button>
      </div>

      <div v-if="isLoading" class="loading-state">Cargando tus pedidos...</div>

      <div v-else-if="filteredOrders.length > 0" class="orders-list">
        <article v-for="order in filteredOrders" :key="getOrderKey(order)" class="order-card">
          <div class="order-topline">
            <div>
              <span class="order-label">Pedido</span>
              <strong>#{{ String(order.orderId ?? order.id ?? order._id ?? 'pedido').slice(-6).toUpperCase() }}</strong>
            </div>
            <span class="status-badge" :class="normalizeStatus(order.status)">{{ statusLabel(order.status) }}</span>
          </div>

          <div class="order-meta">
            <span>Fecha: {{ formatDate(order.createdAt) }}</span>
            <span>Total: {{ formatPrice(order.total) }}</span>
          </div>

          <div class="payment-row">
            <span class="payment-label">Pago</span>
            <span class="payment-value">
              {{ order.paymentMethod || 'Mercado Pago' }} ·
              {{ order.cardBrand || 'Visa' }} {{ order.cardLast4 ? `•••• ${order.cardLast4}` : '•••• 1111' }}
            </span>
          </div>

          <button class="details-toggle" @click="toggleOrderDetails(getOrderKey(order))">
            {{ isOrderExpanded(getOrderKey(order)) ? 'Ocultar detalle' : 'Ver detalle' }}
          </button>

          <div v-if="isOrderExpanded(getOrderKey(order))" class="order-details">
            <div class="detail-header">
              <span class="detail-label">Productos</span>
              <span class="detail-total">{{ formatPrice(order.total) }}</span>
            </div>

            <ul class="order-items">
              <li v-for="item in order.items" :key="`${getOrderKey(order)}-${item.productId ?? item.name ?? 'item'}`" class="order-item">
                <span>{{ item.name }}</span>
                <span>{{ item.quantity }} × {{ formatPrice(item.price) }}</span>
              </li>
            </ul>
          </div>
        </article>
      </div>

      <div v-else class="empty-state">
        <h2>No hay pedidos en este estado</h2>
        <p>Prueba con otra categoría o vuelve al catálogo para seguir comprando.</p>
        <NuxtLink to="/cliente" class="primary-action">Ir al catálogo</NuxtLink>
      </div>
    </div>

    <div v-else class="empty-state">
      <h2>Inicia sesión para ver tus pedidos</h2>
      <p>Necesitas tener una sesión activa para consultar tu historial.</p>
      <button class="primary-action" @click="openLogin">Entrar</button>
    </div>
  </div>
</template>

<style scoped>
.orders-page {
  max-width: 980px;
  margin: 0 auto;
  padding: 3rem 1.25rem 4rem;
}

.orders-shell {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
}

.eyebrow {
  display: inline-block;
  color: #245b45;
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  font-weight: 700;
  text-transform: uppercase;
}

.page-header h1 {
  margin: 0.4rem 0 0;
  color: #18231d;
  font-size: clamp(2rem, 4vw, 3rem);
}

.orders-count {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  background: #edf5f0;
  color: #245b45;
  padding: 0.5rem 0.8rem;
  font-size: 0.8rem;
  font-weight: 700;
}

.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.filter-chip {
  border: 1px solid #dfe7e1;
  background: #fff;
  border-radius: 999px;
  padding: 0.55rem 0.9rem;
  color: #2c4a3e;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-chip.active {
  background: #245b45;
  border-color: #245b45;
  color: #fff;
}

.orders-list {
  display: grid;
  gap: 1rem;
}

.order-card {
  background: #fff;
  border: 1px solid #e4e9e5;
  border-radius: 16px;
  padding: 1.25rem;
  box-shadow: 0 10px 24px rgba(24, 35, 29, 0.04);
}

.order-topline,
.order-meta,
.order-item,
.detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.order-label {
  display: block;
  color: #6a776e;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.order-topline strong {
  color: #18231d;
  font-size: 1.15rem;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0.45rem 0.75rem;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.status-badge.pagado {
  background: #edf7f1;
  color: #1f6b49;
}

.status-badge.pendiente {
  background: #fff5de;
  color: #9c6d00;
}

.status-badge.fallido {
  background: #fde9e8;
  color: #a33a39;
}

.order-meta {
  margin: 1rem 0 0.7rem;
  color: #66736b;
  font-size: 0.9rem;
  flex-wrap: wrap;
}

.payment-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding: 0.7rem 0.9rem;
  border-radius: 10px;
  background: #f5f9f6;
  border: 1px solid #e8efe9;
  color: #2d4039;
  font-size: 0.9rem;
}

.payment-label {
  color: #5d6d66;
  font-weight: 600;
}

.payment-value {
  font-weight: 700;
  color: #1d3328;
}

.details-toggle {
  background: transparent;
  border: 1px solid #dfe7e1;
  color: #245b45;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  font-weight: 700;
  cursor: pointer;
}

.order-details {
  margin-top: 1rem;
  border: 1px solid #edf1ee;
  border-radius: 12px;
  background: #f8faf8;
  padding: 1rem;
}

.detail-header {
  color: #18231d;
  margin-bottom: 0.8rem;
  font-weight: 700;
}

.detail-label {
  color: #2c4a3e;
}

.detail-total {
  color: #18231d;
}

.order-items {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.order-item {
  color: #18231d;
  border-top: 1px solid #edf1ee;
  padding-top: 0.7rem;
  font-size: 0.95rem;
}

.empty-state,
.loading-state {
  background: #fff;
  border: 1px solid #e4e9e5;
  border-radius: 16px;
  padding: 2rem 1.5rem;
  text-align: center;
}

.empty-state h2,
.loading-state {
  color: #18231d;
}

.empty-state p {
  color: #67756d;
  margin-bottom: 1.5rem;
}

.primary-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.2rem;
  background: #245b45;
  border: 1px solid #245b45;
  border-radius: 10px;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
}

@media (max-width: 640px) {
  .page-header,
  .order-topline,
  .order-meta,
  .order-item,
  .detail-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
