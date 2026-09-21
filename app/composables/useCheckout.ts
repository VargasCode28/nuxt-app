import { ref } from 'vue'
import { checkoutService } from '~/services/checkoutService'

export const useCheckout = () => {
  const isProcessing = ref(false)
  const errorMessage = ref<string | null>(null)
  const lastOrder = ref<any>(null)

  const pay = async () => {
    isProcessing.value = true
    errorMessage.value = null
    try {
      
      const order = await checkoutService.pay()
      lastOrder.value = order
      return order
    } catch (error: any) {
      errorMessage.value = error?.data?.statusMessage || 'No se pudo procesar el pago.'
      return null
    } finally {
      isProcessing.value = false
    }
  }

  return { pay, isProcessing, errorMessage, lastOrder }
}