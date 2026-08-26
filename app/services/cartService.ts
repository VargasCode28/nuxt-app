export const cartService = {
get: (userId: string) =>
    $fetch(`/api/cart/${userId}`),

addItem: (userId: string, item: { productId: string; name: string; price: number; image?: string; quantity?: number }) =>
    $fetch(`/api/cart/${userId}/item`, { method: 'POST', body: item }),

removeItem: (userId: string, productId: string) =>
    $fetch(`/api/cart/${userId}/item`, { method: 'DELETE', body: { productId } })
}
