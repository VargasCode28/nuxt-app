









import { connectMongo } from '~~/server/utils/mongodb'
import { CartModel } from '~~/server/models/cart.model'
import { OrderModel } from '~~/server/models/order.model'
import { verifyToken } from '~~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  await connectMongo()

  const token = getCookie(event, 'auth_token')
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Debes iniciar sesión para pagar' })
  }

  const payload = verifyToken(token)
  if (!payload) {
    throw createError({ statusCode: 401, statusMessage: 'Sesión inválida, vuelve a iniciar sesión' })
  }

  const userId = payload.id

  const cart = await CartModel.findOne({ userId })
  if (!cart || cart.items.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'Tu carrito está vacío' })
  }

  const orderItems = cart.items.map(item => ({
    productId: item.productId,
    name: item.name ?? '',
    price: item.price ?? 0,
    quantity: item.quantity
  }))

  const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const isMercadoPagoSimulation = process.env.MP_SIMULATION === 'true' || !process.env.MP_ACCESS_TOKEN
  const paymentId = `MP_SIM_${Date.now()}`

  await new Promise(resolve => setTimeout(resolve, 1200))

  const order = await OrderModel.create({
    userId,
    items: orderItems,
    total,
    status: 'pagado'
  })

  cart.items = []
  cart.updatedAt = new Date()
  await cart.save()

  return {
    orderId: order._id,
    total: order.total,
    status: order.status,
    createdAt: order.createdAt,
    paymentProvider: isMercadoPagoSimulation ? 'Mercado Pago simulado' : 'Mercado Pago',
    paymentId,
    paymentStatus: isMercadoPagoSimulation ? 'approved' : 'pending'
  }
})