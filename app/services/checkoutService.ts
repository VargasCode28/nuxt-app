export const checkoutService = {
pay: () => $fetch('/api/checkout', { method: 'POST' })
}

