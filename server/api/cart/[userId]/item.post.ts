// import { connectMongo } from '~/server/utils/mongodb'
// import { CartModel } from '~/server/models/cart.model'


import { connectMongo }  from '../../../utils/mongodb'
import { CartModel } from '~~/server/models/cart.model'
import { requireUserAccess } from '~~/server/utils/auth'


export default defineEventHandler(async (event) => {
  await connectMongo()
  const userId = getRouterParam(event, 'userId')
  if (!userId) {
    throw createError({ statusCode: 400, statusMessage: 'Falta el usuario del carrito' })
  }
  await requireUserAccess(event, userId)
  const { productId, name, price, image, quantity } = await readBody(event)

  let cart = await CartModel.findOne({ userId })
  if (!cart) cart = new CartModel({ userId, items: [] })

  const existingItem = cart.items.find((i: any) => i.productId === productId)
  if (existingItem) {
    existingItem.quantity += quantity || 1
  } else {
    cart.items.push({ productId, name, price, image, quantity: quantity || 1 })
  }

  cart.updatedAt = new Date()
  await cart.save()

  return cart
})

