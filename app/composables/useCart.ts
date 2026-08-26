import { ref } from 'vue'
import { cartService } from '~/services/cartService'
import { useAuth } from '~/composables/useAuth'

export const useCart = () => {
  const cart = useState<any>('cartData', () => null)
  const isLoading = ref(false)
  const errorMessage = ref<string | null>(null)
  const { user, fetchUser } = useAuth()

  const loadCart = async () => {
    await fetchUser()
    if (!user.value) return
    cart.value = await cartService.get(user.value.id).catch(() => null)
  }

  const addToCart = async (product: any, quantity = 1) => {
    errorMessage.value = null
    await fetchUser()

    if (!user.value) {
      errorMessage.value = 'Debes iniciar sesión para agregar al carrito.'
      return false
    }

    isLoading.value = true
    try {
      cart.value = await cartService.addItem(user.value.id, {
        productId: product._id,
        name: product.name,
        price: Number(String(product.price).replace(/[^0-9.-]+/g, '')) || 0,
        image: product.image,
        quantity
      })
      return true
    } catch (error: any) {
      errorMessage.value = error?.data?.statusMessage || 'No se pudo agregar el producto.'
      return false
    } finally {
      isLoading.value = false
    }
  }

  const removeFromCart = async (productId: string) => {
    if (!user.value) return
    cart.value = await cartService.removeItem(user.value.id, productId)
  }

  return { cart, isLoading, errorMessage, loadCart, addToCart, removeFromCart }
}