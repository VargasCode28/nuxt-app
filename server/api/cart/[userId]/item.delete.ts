import { connectMongo } from '../../../utils/mongodb'
import { CartModel } from '~~/server/models/cart.model'






export default defineEventHandler(async (event) => {
  await connectMongo()
  const userId = getRouterParam(event, 'userId')
  const { productId } = await readBody(event)

  const cart = await CartModel.findOneAndUpdate(
    { userId },
    { $pull: { items: { productId } }, updatedAt: new Date() },
    { new: true }
  )

  return cart
})













