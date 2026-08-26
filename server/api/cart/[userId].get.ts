import { connectMongo }  from '~~/server/utils/mongodb'
import { CartModel } from '~~/server/models/cart.model'






export default defineEventHandler(async (event) => {
  await connectMongo()
  const userId = getRouterParam(event, 'userId')

  let cart = await CartModel.findOne({ userId })
  if (!cart) cart = await CartModel.create({ userId, items: [] })

  return cart
})

