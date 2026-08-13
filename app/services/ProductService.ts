// Preparado para conectar con tu backend (ej. Node.js, Firebase, etc.)
// Definimos la interfaz TypeScript para tus plantas
export interface Product {
id?: string;
name: string;
description: string;
price: number;
imageUrl: string;
}

export const ProductService = {
  // Obtener todas las plantas
async getAllProducts() {
    // await $fetch('/api/v1/products') <-- Así será tu código real futuro
    console.log('Simulando petición GET para obtener plantas...');
    return []; 
},

  // Crear una nueva planta (con imágenes)
async createProduct(productData: FormData) {
    // await $fetch('/api/v1/products', { method: 'POST', body: productData })
    console.log('Simulando petición POST para crear planta...');
},

  // Eliminar planta
async deleteProduct(id: string) {
    // await $fetch(`/api/v1/products/${id}`, { method: 'DELETE' })
    console.log(`Simulando eliminación de la planta ${id}...`);
}
}