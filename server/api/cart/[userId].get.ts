import { connectMongo }  from '~~/server/utils/mongodb'
import { CartModel } from '~~/server/models/cart.model'
import { requireUserAccess } from '~~/server/utils/auth'






export default defineEventHandler(async (event) => {
  await connectMongo()
  const userId = getRouterParam(event, 'userId')
  if (!userId) {
    throw createError({ statusCode: 400, statusMessage: 'Falta el usuario del carrito' })
  }
  await requireUserAccess(event, userId)

  let cart = await CartModel.findOne({ userId })
  if (!cart) cart = await CartModel.create({ userId, items: [] })

  return cart
})

