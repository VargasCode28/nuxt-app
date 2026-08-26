
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCart } from '~/composables/useCart'

const { data: products } = await useFetch<any[]>('/api/products')
const { addToCart, errorMessage } = useCart()

const searchQuery = ref('')
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

const isImageUrl = (value: string) => {
  return !!value && (value.startsWith('/') || value.startsWith('http'))
}

const handleAddToCart = (product: any) => {
  addToCart(product)
}

// Formulario de contacto
const contactForm = ref({ name: '', email: '', message: '' })
const contactSent = ref(false)

const handleContactSubmit = () => {
  if (!contactForm.value.name || !contactForm.value.email || !contactForm.value.message) return
  // Aquí iría la llamada real a /api/contact
  contactSent.value = true
  contactForm.value = { name: '', email: '', message: '' }
  setTimeout(() => { contactSent.value = false }, 4000)
}

const filteredProducts = computed(() => {
  if (!products.value) return []
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

    <!-- Sección Sobre Nosotros -->
    <section class="about-us">
      <div class="about-content">
        <span class="about-tag">Nuestra Esencia</span>
        <h2 class="about-title">Cuidamos la vida en tu hogar</h2>
        <p class="about-description">
          Creemos que las plantas son más que decoración; son el latido de un espacio.
          Seleccionamos cuidadosamente cada ejemplar para transformar tus ambientes en
          refugios de paz y equilibrio natural.
        </p>
      </div>
      <div class="about-mark" aria-hidden="true">
        <svg viewBox="0 0 120 120" fill="none">
          <path d="M60 10C40 30 20 45 20 70C20 90 38 105 60 105C82 105 100 90 100 70C100 45 80 30 60 10Z" stroke="currentColor" stroke-width="1.2"/>
          <path d="M60 15V100" stroke="currentColor" stroke-width="1"/>
        </svg>
      </div>
    </section>

    <!-- Cabecera del Catálogo -->
    <header class="catalog-header">
      <span class="catalog-tag">Curaduría Botánica</span>
      <h1 class="title">Nuestras Plantas</h1>
      <p class="subtitle">Diseño vivo y naturaleza en perfecta armonía para espacios contemporáneos.</p>

      <div class="search-bar-wrapper">
        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar por nombre o categoría..."
          class="search-input"
        />
      </div>
    </header>

    <!-- Mensaje de error del carrito -->
    <p v-if="errorMessage" class="cart-error">{{ errorMessage }}</p>

    <!-- Grid de Productos -->
    <div v-if="filteredProducts.length > 0" class="products-grid-wrapper">
      <div class="products-grid">
        <article
          v-for="product in filteredProducts"
          :key="product._id || product.id"
          class="product-card"
          @click="openProductModal(product)"
        >
          <div class="product-image-container">
            <img
              v-if="isImageUrl(product.image)"
              :src="product.image"
              :alt="product.name"
              class="product-photo"
            />
            <span v-else class="plant-icon">{{ product.image || '🪴' }}</span>

            <span class="price-tag">{{ product.price }}</span>

            <div class="card-overlay-action">
              <span class="quick-view-badge">Vista rápida</span>
            </div>
          </div>

          <div class="product-info">
            <span class="product-category">{{ product.category }}</span>
            <div class="product-row">
              <h3 class="product-name">{{ product.name }}</h3>
              <!-- <button class="add-to-cart-btn" @click.stop="handleAddToCart(product)">
                Añadir
              </button> -->
            </div>
          </div>
        </article>
      </div>
    </div>

    <!-- Estado Vacío -->
    <div v-else class="no-results">
      <span class="no-results-icon">🌿</span>
      <p>No encontramos plantas que coincidan con <strong>"{{ searchQuery }}"</strong></p>
    </div>

    <!-- Modal global de detalles -->
    <productomodal
      :product="selectedProduct"
      :isOpen="isModalOpen"
      @close="closeProductModal"
    />

    <!-- Sección de Contacto -->
    <section class="contact-section">
      <div class="contact-inner">

        <div class="contact-form-col">
          <span class="catalog-tag">Visitanos</span>
          <h2 class="contact-title">Hablemos de plantas</h2>
          <p class="contact-copy">
            Escribinos por un pedido especial, asesoría de cuidado o simplemente
            para saludar. Respondemos en menos de 24 horas.
          </p>

          <form class="contact-form" @submit.prevent="handleContactSubmit">
            <div class="form-field">
              <label for="contact-name">Nombre</label>
              <input id="contact-name" v-model="contactForm.name" type="text" placeholder="Tu nombre" required />
            </div>
            <div class="form-field">
              <label for="contact-email">Correo</label>
              <input id="contact-email" v-model="contactForm.email" type="email" placeholder="tu@correo.com" required />
            </div>
            <div class="form-field">
              <label for="contact-message">Mensaje</label>
              <textarea id="contact-message" v-model="contactForm.message" rows="4" placeholder="Contanos qué estás buscando..." required></textarea>
            </div>
            <button type="submit" class="contact-submit-btn">Enviar mensaje</button>
            <p v-if="contactSent" class="contact-success">Gracias, te vamos a responder pronto 🌱</p>
          </form>
        </div>

        <div class="contact-map-col">
          <div class="map-card">
            <svg class="store-map" viewBox="0 0 400 420" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="400" height="420" fill="var(--paper)" />
              <path d="M0 60 H400" stroke="#ddd6c1" stroke-width="2"/>
              <path d="M0 220 H400" stroke="#ddd6c1" stroke-width="2"/>
              <path d="M0 340 H400" stroke="#ddd6c1" stroke-width="2"/>
              <path d="M110 0 V420" stroke="#ddd6c1" stroke-width="2"/>
              <path d="M290 0 V420" stroke="#ddd6c1" stroke-width="1.5"/>
              <path d="M0 140 H400" stroke="#e7e1cf" stroke-width="1"/>
              <rect x="20" y="80" width="70" height="50" fill="#e5e0cd" />
              <rect x="150" y="20" width="60" height="30" fill="#e5e0cd" />
              <rect x="320" y="240" width="60" height="70" fill="#e5e0cd" />
              <rect x="20" y="260" width="60" height="60" fill="#e5e0cd" />
              <circle cx="200" cy="190" r="46" fill="var(--forest)" opacity="0.08" />
              <path d="M200 130 C170 155 155 180 155 205 C155 232 175 252 200 252 C225 252 245 232 245 205 C245 180 230 155 200 130Z" fill="var(--forest)"/>
              <circle cx="200" cy="197" r="14" fill="var(--cream)"/>
              <text x="200" y="290" text-anchor="middle" class="map-label">Vivero Clary</text>
              <text x="200" y="308" text-anchor="middle" class="map-sublabel">Av. de los Helechos 482</text>
            </svg>
          </div>

          <ul class="contact-details">
            <li><strong>Dirección</strong><span>Av. de los Helechos 482, Providencia, Santiago</span></li>
            <li><strong>Horario</strong><span>Lun a sáb · 10:00–19:00</span></li>
            <li><strong>Contacto</strong><span>hola@Clary.cl · +56 9 1234 5678</span></li>
          </ul>
        </div>

      </div>
    </section>

    <!-- Footer -->
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <div class="footer-logo">
            <svg class="footer-logo-mark" viewBox="0 0 32 32" aria-hidden="true">
              <path d="M16 4C10 9 6 13 6 19C6 24.5 10.5 29 16 29C21.5 29 26 24.5 26 19C26 13 22 9 16 4Z" fill="var(--gold-light)"/>
              <path d="M16 8V26" stroke="var(--forest)" stroke-width="1.2"/>
            </svg>
            <span class="footer-logo-text">Clary</span>
          </div>
          <p class="footer-tagline">Naturaleza en cada rincón de tu hogar.</p>
        </div>

        <nav class="footer-links">
          <div class="footer-col">
            <span class="footer-col-title">Tienda</span>
            <a href="#">Plantas</a>
            <a href="#">Macetas &amp; Decor</a>
            <a href="#">Cuidado</a>
          </div>
          <div class="footer-col">
            <span class="footer-col-title">Compañía</span>
            <a href="#">Sobre nosotros</a>
            <a href="#">Contacto</a>
          </div>
          <div class="footer-col">
            <span class="footer-col-title">Síguenos</span>
            <a href="#">Instagram</a>
          </div>
        </nav>
      </div>

      <div class="footer-bottom">
        <span>© {{ new Date().getFullYear() }} Clary. Todos los derechos reservados.</span>
      </div>
    </footer>

  </div>
</template>





<style scoped
src="~/assets/css/clients/index.css"

>
</style>