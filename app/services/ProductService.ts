
export const productService = {
  getAll: () => $fetch('/api/products'),

  create: (data: any) =>
    $fetch('/api/products', { method: 'POST', body: data }),

  update: (id: string, data: any) =>
    $fetch(`/api/products/${id}`, { method: 'PUT', body: data }),

  remove: (id: string) =>
    $fetch(`/api/products/${id}`, { method: 'DELETE' }),



   //NEW  FUNCION
    uploadImage: (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    return $fetch<{ url: string }>('/api/upload', { method: 'POST', body: formData })
    }
}


