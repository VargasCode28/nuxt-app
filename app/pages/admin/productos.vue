<script setup lang="ts">
// import { ref, reactive } from 'vue'
// import { productService } from '~/services/ProductService'

// definePageMeta({
//   layout: 'admin'
// })

// const { data: products, refresh } = await useFetch<any[]>('/api/products')

// const isModalOpen = ref(false)
// const isEditing = ref(false)
// const isSaving = ref(false)
// const errorMessage = ref('')

// const emptyForm = { _id: '', name: '', category: '', price: '', image: '🪴', description: '', stock: 0 }
// const form = reactive({ ...emptyForm })

// const openCreateModal = () => {
//   Object.assign(form, emptyForm)
//   isEditing.value = false
//   errorMessage.value = ''
//   isModalOpen.value = true
// }

// const openEditModal = (product: any) => {
//   Object.assign(form, product)
//   isEditing.value = true
//   errorMessage.value = ''
//   isModalOpen.value = true
// }

// const closeModal = () => {
//   isModalOpen.value = false
// }

// const handleSubmit = async () => {
//   isSaving.value = true
//   errorMessage.value = ''
//   try {
//     if (isEditing.value) {
//       await productService.update(form._id, form)
//     } else {
//       await productService.create(form)
//     }
//     await refresh()
//     closeModal()
//   } catch (error: any) {
//     errorMessage.value = error?.data?.statusMessage || 'Ocurrió un error al guardar el producto.'
//   } finally {
//     isSaving.value = false
//   }
// }

// const handleDelete = async (product: any) => {
//   const confirmed = confirm(`¿Eliminar "${product.name}"? Esta acción no se puede deshacer.`)
//   if (!confirmed) return

//   try {
//     await productService.remove(product._id)
//     await refresh()
//   } catch (error: any) {
//     alert(error?.data?.statusMessage || 'No se pudo eliminar el producto.')
//   }
// }







import { ref, reactive } from 'vue'
import { productService } from '~/services/ProductService'

definePageMeta({
  layout: 'admin'
})

const { data: products, refresh } = await useFetch<any[]>('/api/products')

const isModalOpen = ref(false)
const isEditing = ref(false)
const isSaving = ref(false)
const isUploading = ref(false)
const errorMessage = ref('')

const emptyForm = { _id: '', name: '', category: '', price: '', image: '', description: '', stock: 0 }
const form = reactive({ ...emptyForm })

const imagePreview = ref<string | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

const openCreateModal = () => {
  Object.assign(form, emptyForm)
  imagePreview.value = null
  isEditing.value = false
  errorMessage.value = ''
  isModalOpen.value = true
}

const openEditModal = (product: any) => {
  Object.assign(form, product)
  imagePreview.value = isImageUrl(product.image) ? product.image : null
  isEditing.value = true
  errorMessage.value = ''
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

// Distingue si "image" es una ruta de archivo real o un emoji suelto
const isImageUrl = (value: string) => {
  return !!value && (value.startsWith('/') || value.startsWith('http'))
}

const triggerFileSelect = () => {
  fileInput.value?.click()
}

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  errorMessage.value = ''
  isUploading.value = true
  try {
    const result = await productService.uploadImage(file)
    form.image = result.url
    imagePreview.value = result.url
  } catch (error: any) {
    errorMessage.value = error?.data?.statusMessage || 'No se pudo subir la imagen.'
  } finally {
    isUploading.value = false
  }
}

const removeImage = () => {
  form.image = ''
  imagePreview.value = null
  if (fileInput.value) fileInput.value.value = ''
}

const handleSubmit = async () => {
  isSaving.value = true
  errorMessage.value = ''
  try {
    if (isEditing.value) {
      await productService.update(form._id, form)
    } else {
      await productService.create(form)
    }
    await refresh()
    closeModal()
  } catch (error: any) {
    errorMessage.value = error?.data?.statusMessage || 'Ocurrió un error al guardar el producto.'
  } finally {
    isSaving.value = false
  }
}

const handleDelete = async (product: any) => {
  const confirmed = confirm(`¿Eliminar "${product.name}"? Esta acción no se puede deshacer.`)
  if (!confirmed) return

  try {
    await productService.remove(product._id)
    await refresh()
  } catch (error: any) {
    alert(error?.data?.statusMessage || 'No se pudo eliminar el producto.')
  }
}



</script>

<template>
  <div class="products-admin">
    <div class="header">
      <div>
        <h1>Gestión de Plantas</h1>
        <p class="subtitle">Crea, edita y elimina productos del catálogo</p>
      </div>
      <button class="btn-primary" @click="openCreateModal">+ Nueva Planta</button>
    </div>

    <table class="products-table" v-if="products && products.length > 0">
      <thead>
        <tr>
          <th></th>
          <th>Nombre</th>
          <th>Categoría</th>
          <th>Precio</th>
          <th>Stock</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product._id">
          <td class="icon-cell">
            <img v-if="isImageUrl(product.image)" :src="product.image" :alt="product.name" class="product-thumb" />
            <span v-else>{{ product.image || '🪴' }}</span>
          </td>
          <td>{{ product.name }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.stock ?? 0 }}</td>
          <td class="actions-cell">
            <button class="btn-edit" @click="openEditModal(product)">Editar</button>
            <button class="btn-delete" @click="handleDelete(product)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else class="empty-state">Todavía no hay productos. Crea el primero.</p>

    <!-- Modal de crear/editar -->
    <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-btn" @click="closeModal">&times;</button>
        <h2>{{ isEditing ? 'Editar Planta' : 'Nueva Planta' }}</h2>

        <div v-if="errorMessage" class="error-banner">{{ errorMessage }}</div>

        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>Nombre:</label>
            <input v-model="form.name" type="text" required />
          </div>

          <div class="form-group">
            <label>Categoría:</label>
            <input v-model="form.category" type="text" required />
          </div>

          <div class="form-group">
            <label>Precio:</label>
            <input v-model="form.price" type="text" placeholder="$12.990" required />
          </div>

          <!-- <div class="form-group">
            <label>Emoji / Icono:</label>
            <input v-model="form.image" type="text" placeholder="🪴" />
          </div> -->



<div class="form-group">
  <label>Imagen del producto:</label>

  <input
    ref="fileInput"
    type="file"
    accept="image/jpeg,image/png,image/webp,image/gif"
    class="file-input-hidden"
    @change="handleFileChange"
  />

  <div v-if="imagePreview" class="image-preview-wrapper">
    <img :src="imagePreview" alt="Vista previa" class="image-preview" />
    <button type="button" class="btn-remove-image" @click="removeImage">Quitar imagen</button>
  </div>

  <button
    v-else
    type="button"
    class="btn-upload"
    @click="triggerFileSelect"
    :disabled="isUploading"
  >
    {{ isUploading ? 'Subiendo...' : '📷 Subir imagen' }}
  </button>
</div>

          <div class="form-group">
            <label>Stock:</label>
            <input v-model.number="form.stock" type="number" min="0" />
          </div>

          <div class="form-group">
            <label>Descripción:</label>
            <textarea v-model="form.description" rows="3"></textarea>
          </div>

          <button type="submit" class="btn-submit" :disabled="isSaving">
            {{ isSaving ? 'Guardando...' : (isEditing ? 'Guardar cambios' : 'Crear producto') }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.products-admin {
  width: 100%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.75rem;
  gap: 1rem;
}

.header h1 {
  margin: 0 0 0.35rem;
  color: #18231d;
  font-family: Georgia, serif;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 500;
  letter-spacing: -0.02em;
}

.subtitle {
  margin: 0;
  color: #6a776e;
  font-size: 0.9rem;
}

.btn-primary {
  background-color: #245b45;
  color: #fff;
  border: 1px solid #245b45;
  padding: 0.68rem 1rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.btn-primary:hover {
  background-color: #174331;
  transform: translateY(-1px);
}

.products-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border: 1px solid #dfe7e1;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(24, 35, 29, 0.05);
}

.products-table th {
  text-align: left;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #66736b;
  padding: 0.8rem 1rem;
  background-color: #f5f8f5;
  border-bottom: 1px solid #dfe7e1;
}

.products-table td {
  padding: 0.9rem 1rem;
  border-bottom: 1px solid #edf1ee;
  font-size: 0.86rem;
  color: #304037;
  vertical-align: middle;
}

.products-table tbody tr {
  transition: background-color 0.2s ease;
}

.products-table tbody tr:hover {
  background: #f8fbf9;
}

.icon-cell {
  width: 64px;
  color: #245b45;
  font-size: 1.4rem;
}

.product-thumb {
  display: block;
  width: 42px;
  height: 42px;
  border-radius: 6px;
  object-fit: cover;
  border: 1px solid #dfe7e1;
}

.actions-cell {
  display: flex;
  gap: 0.5rem;
  white-space: nowrap;
}

.btn-edit, .btn-delete {
  padding: 0.4rem 0.85rem;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  border: 1px solid #cdd9d0;
  background: transparent;
  font-weight: 650;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.btn-edit:hover {
  border-color: #245b45;
  color: #245b45;
  background: #edf5f0;
}

.btn-delete {
  color: #991b1b;
  border-color: #fecaca;
}

.btn-delete:hover {
  background-color: #fdf2f2;
}

.empty-state {
  color: #6a776e;
  font-size: 0.9rem;
  padding: 3rem;
  text-align: center;
  background: #ffffff;
  border: 1px dashed #cdd9d0;
  border-radius: 8px;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background-color: rgba(24, 35, 29, 0.38);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #ffffff;
  padding: 2rem;
  width: 100%;
  max-width: 450px;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid #dfe7e1;
  border-radius: 8px;
  box-shadow: 0 24px 60px rgba(24, 35, 29, 0.18);
  position: relative;
}

.modal-content h2 {
  margin: 0 0 1.5rem;
  color: #18231d;
  font-family: Georgia, serif;
  font-size: 1.65rem;
  font-weight: 500;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1.25rem;
  width: 32px;
  height: 32px;
  background: #f5f8f5;
  border: 1px solid #dfe7e1;
  border-radius: 6px;
  font-size: 1.5rem;
  cursor: pointer;
  color: #66736b;
  line-height: 1;
}

.close-btn:hover {
  background: #edf5f0;
  color: #245b45;
}

.error-banner {
  background-color: #fdf2f2;
  color: #991b1b;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 0.85rem;
  margin-bottom: 1.25rem;
  border: 1px solid #fecaca;
}

.form-group {
  margin-bottom: 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 500;
  color: #304037;
  font-weight: 650;
}

.form-group input, .form-group textarea {
  padding: 0.65rem;
  border: 1px solid #cdd9d0;
  border-radius: 6px;
  font-size: 0.9rem;
  font-family: inherit;
  outline: none;
}

.form-group input:focus, .form-group textarea:focus {
  border-color: #245b45;
  box-shadow: 0 0 0 3px rgba(36, 91, 69, 0.12);
}

.btn-submit {
  width: 100%;
  background-color: #245b45;
  color: #fff;
  padding: 0.75rem;
  border: none;
  border: 1px solid #245b45;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 0.5rem;
}

.btn-submit:hover:not(:disabled) {
  background-color: #174331;
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}




































































/*NEWS STYLES FOR THE IMG PRODUCTS */

.file-input-hidden {
  display: none;
}

.btn-upload {
  width: 100%;
  padding: 1rem;
  border: 2px dashed #dcdcdc;
  border-radius: 4px;
  background: #fafafa;
  color: #666;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-upload:hover:not(:disabled) {
  border-color: #111;
  color: #111;
}

.btn-upload:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.image-preview-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.image-preview {
  width: 100%;
  max-height: 180px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #eaeaea;
}

.btn-remove-image {
  font-size: 0.8rem;
  color: #991b1b;
  background: none;
  border: none;
  cursor: pointer;
}

.btn-remove-image:hover {
  text-decoration: underline;
}

button:focus-visible,
a:focus-visible,
input:focus-visible,
textarea:focus-visible {
  outline: 3px solid rgba(36, 91, 69, 0.2);
  outline-offset: 2px;
}

@media (max-width: 760px) {
  .header {
    align-items: stretch;
    flex-direction: column;
  }

  .btn-primary {
    align-self: flex-start;
  }

  .products-table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }

  .modal-content {
    max-height: 92vh;
    padding: 1.5rem;
  }
}

</style>