// import { connectMongo } from '~~/server/utils/mongodb'
// import { CartModel } from '~~/server/models/cart.model'
// import { OrderModel } from '~~/server/models/order.model'
// import { verifyToken } from '~~/server/utils/jwt'

// export default defineEventHandler(async (event) => {
//   await connectMongo()

//   const token = getCookie(event, 'auth_token')
//   if (!token) {
//     throw createError({ statusCode: 401, statusMessage: 'Debes iniciar sesión para pagar' })
//   }

//   const payload = verifyToken(token)
//   if (!payload) {
//     throw createError({ statusCode: 401, statusMessage: 'Sesión inválida, vuelve a iniciar sesión' })
//   }

//   const userId = payload.id

//   const cart = await CartModel.findOne({ userId })
//   if (!cart || cart.items.length === 0) {
//     throw createError({ statusCode: 400, statusMessage: 'Tu carrito está vacío' })
//   }

//   const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

//   await new Promise(resolve => setTimeout(resolve, 1200))

//   const order = await OrderModel.create({
//     userId,
//     items: cart.items,
//     total,
//     status: 'pagado'
//   })

//   cart.items = []
//   cart.updatedAt = new Date()
//   await cart.save()

//   return {
//     orderId: order._id,
//     total: order.total,
//     status: order.status,
//     createdAt: order.createdAt
//   }
// })










import { connectMongo } from '~~/server/utils/mongodb'
import { CartModel } from '~~/server/models/cart.model'
import { OrderModel } from '~~/server/models/order.model'
import { verifyToken } from '~~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  await connectMongo()

  // Verifica sesión activa mediante la cookie, no confiamos en el body
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

  // Normaliza los items: garantiza price y name como valores reales, no undefined
  const orderItems = cart.items.map(item => ({
    productId: item.productId,
    name: item.name ?? '',
    price: item.price ?? 0,
    quantity: item.quantity
  }))

  const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Simulación del proceso de pago (delay artificial, siempre exitoso en esta fase)
  await new Promise(resolve => setTimeout(resolve, 1200))

  const order = await OrderModel.create({
    userId,
    items: orderItems,
    total,
    status: 'pagado'
  })

  // Vacía el carrito tras el pago exitoso
  cart.items = []
  cart.updatedAt = new Date()
  await cart.save()

  return {
    orderId: order._id,
    total: order.total,
    status: order.status,
    createdAt: order.createdAt
  }
})