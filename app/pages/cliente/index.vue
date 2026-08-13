<!-- 
<script setup lang="ts">
import { ref, computed } from 'vue'




const products = ref([
  { id: 1, name: 'Monstera Deliciosa', category: 'Interior', price: '$25.00', image: '🌿' },
  { id: 2, name: 'Ficus Lyrata', category: 'Interior', price: '$35.00', image: '🌱' },
  { id: 3, name: 'Cactus San Pedro', category: 'Exterior', price: '$18.00', image: '🌵' },
  { id: 4, name: 'Poto Neón', category: 'Colgante', price: '$15.00', image: '🌿' },
  { id: 5, name: 'Sansevieria', category: 'Interior', price: '$20.00', image: '🪴' },
  { id: 6, name: 'Palmera Areca', category: 'Interior', price: '$30.00', image: '🌴' },
])




const searchQuery = ref('')




const filteredProducts = computed(() => {
  if (!searchQuery.value.trim()) {
    return products.value
  }
  const query = searchQuery.value.toLowerCase()
  return products.value.filter(product => 
    product.name.toLowerCase().includes(query) || 
    product.category.toLowerCase().includes(query)
  )
})
</script>

<template>
  <div class="catalog-container">
    
    <div class="catalog-header">
      <h1 class="title">Nuestras Plantas</h1>
      <p class="subtitle">Explora nuestra selección botánica para espacios modernos</p>
      
      <div class="search-bar-wrapper">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Buscar por nombre o categoría..." 
          class="search-input"
        />
      </div>
    </div>

    <div v-if="filteredProducts.length > 0" class="products-grid">
      <div v-for="product in filteredProducts" :key="product.id" class="product-card">
        <div class="product-image-placeholder">
          <span class="plant-icon">{{ product.image }}</span>
        </div>
        <div class="product-info">
          <span class="product-category">{{ product.category }}</span>
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-price">{{ product.price }}</p>
          <button class="btn-add">Agregar al carrito</button>
        </div>
      </div>
    </div>

    <div v-else class="no-results">
      <p>No encontramos plantas que coincidan con "{{ searchQuery }}"</p>
    </div>

  </div>
</template>

<style scoped>
.catalog-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.catalog-header {
  text-align: center;
  margin-bottom: 3rem;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 2rem;
}

.search-bar-wrapper {
  max-width: 450px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 0.85rem 1.25rem;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.2s ease;
  background-color: #fafafa;
}

.search-input:focus {
  border-color: #111;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 2rem;
}

.product-card {
  background: #ffffff;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.04);
}

.product-image-placeholder {
  height: 200px;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.plant-icon {
  font-size: 3rem;
}

.product-info {
  padding: 1.5rem;
}

.product-category {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #888;
  font-weight: 600;
}

.product-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #111;
  margin: 0.25rem 0 0.75rem 0;
}

.product-price {
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 1rem;
}

.btn-add {
  width: 100%;
  background-color: #111;
  color: #fff;
  padding: 0.6rem;
  border: none;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-add:hover {
  background-color: #333;
}

.no-results {
  text-align: center;
  padding: 4rem 0;
  color: #666;
  font-size: 0.95rem;
}
</style> -->






































<script setup lang="ts">
import { ref, computed } from 'vue'

const products = ref([
  { id: 1, name: 'Monstera Deliciosa', category: 'Interior', price: '$25.00', image: '🌿', description: 'Originaria de las selvas tropicales de América Central. Sus hojas perforadas aportan un estilo selvático y moderno insuperable.' },
  { id: 2, name: 'Ficus Lyrata', category: 'Interior', price: '$35.00', image: '🌱', description: 'Conocida como planta hoja de violín, destaca por sus hojas grandes, estructuradas y de un verde brillante impecable.' },
  { id: 3, name: 'Cactus San Pedro', category: 'Exterior', price: '$18.00', image: '🌵', description: 'Resistente y de gran presencia, perfecto para terrazas soleadas o entradas minimalistas con bajo requerimiento de riego.' },
  { id: 4, name: 'Poto Neón', category: 'Colgante', price: '$15.00', image: '🌿', description: 'Famoso por su color verde lima vibrante que ilumina cualquier rincón oscuro o repisa flotante.' },
  { id: 5, name: 'Sansevieria', category: 'Interior', price: '$20.00', image: '🪴', description: 'Prácticamente indestructible. Excelente purificadora de aire nocturna para habitaciones y estudios.' },
  { id: 6, name: 'Palmera Areca', category: 'Interior', price: '$30.00', image: '🌴', description: 'Aporta movimiento y elegancia tropical con frondas finas que crean un ambiente sumamente relajante.' },
])

const searchQuery = ref('')

// Estados para controlar el modal
const isModalOpen = ref(false)
const selectedProduct = ref<any>(null)

const openProductModal = (product: any) => {
  selectedProduct.value = product
  isModalOpen.value = true
}

const closeProductModal = () => {
  isModalOpen.value = false
  selectedProduct.value = null
}

const filteredProducts = computed(() => {
  if (!searchQuery.value.trim()) {
    return products.value
  }
  const query = searchQuery.value.toLowerCase()
  return products.value.filter(product => 
    product.name.toLowerCase().includes(query) || 
    product.category.toLowerCase().includes(query)
  )
})
</script>

<template>
  <div class="catalog-container">
    
    <div class="catalog-header">
      <h1 class="title">Nuestras Plantas</h1>
      <p class="subtitle">Explora nuestra selección botánica para espacios modernos</p>
      
      <div class="search-bar-wrapper">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Buscar por nombre o categoría..." 
          class="search-input"
        />
      </div>
    </div>

    <!-- Grid de productos -->
    <div v-if="filteredProducts.length > 0" class="products-grid">
      <div 
        v-for="product in filteredProducts" 
        :key="product.id" 
        class="product-card"
        @click="openProductModal(product)"
      >
        <div class="product-image-placeholder">
          <span class="plant-icon">{{ product.image }}</span>
        </div>
        <div class="product-info">
          <span class="product-category">{{ product.category }}</span>
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-price">{{ product.price }}</p>
          
          <!-- Botón explícito de Ver Detalles -->
          <button class="btn-detail" @click.stop="openProductModal(product)">
            Ver detalles
          </button>
        </div>
      </div>
    </div>

    <div v-else class="no-results">
      <p>No encontramos plantas que coincidan con "{{ searchQuery }}"</p>
    </div>

    <!-- Modal global de detalles -->
    <productomodal 
      :product="selectedProduct" 
      :isOpen="isModalOpen" 
      @close="closeProductModal" 
    />

  </div>
</template>

<style scoped>
.catalog-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.catalog-header {
  text-align: center;
  margin-bottom: 3rem;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 2rem;
}

.search-bar-wrapper {
  max-width: 450px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 0.85rem 1.25rem;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.2s ease;
  background-color: #fafafa;
}

.search-input:focus {
  border-color: #111;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 2rem;
}

.product-card {
  background: #ffffff;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.04);
}

.product-image-placeholder {
  height: 200px;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.plant-icon {
  font-size: 3rem;
}

.product-info {
  padding: 1.5rem;
}

.product-category {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #888;
  font-weight: 600;
}

.product-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #111;
  margin: 0.25rem 0 0.75rem 0;
}

.product-price {
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 1rem;
}

/* Estilo para el botón de ver detalles */
.btn-detail {
  width: 100%;
  background-color: #111;
  color: #fff;
  padding: 0.6rem;
  border: none;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-detail:hover {
  background-color: #333;
}

.no-results {
  text-align: center;
  padding: 4rem 0;
  color: #666;
  font-size: 0.95rem;
}
</style>