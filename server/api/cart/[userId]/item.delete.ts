import { connectMongo } from '../../../utils/mongodb'
import { CartModel } from '~~/server/models/cart.model'
import { requireUserAccess } from '~~/server/utils/auth'






export default defineEventHandler(async (event) => {
  await connectMongo()
  const userId = getRouterParam(event, 'userId')
  if (!userId) {
    throw createError({ statusCode: 400, statusMessage: 'Falta el usuario del carrito' })
  }
  await requireUserAccess(event, userId)
  const { productId } = await readBody(event)

  const cart = await CartModel.findOneAndUpdate(
    { userId },
    { $pull: { items: { productId } }, updatedAt: new Date() },
    { new: true }
  )

  return cart
})













