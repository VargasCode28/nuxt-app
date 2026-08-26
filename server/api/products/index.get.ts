import { connectMongo } from '~~/server/utils/mongodb'
import { ProductModel } from '~~/server/models/product.model'

export default defineEventHandler(async () => {
  await connectMongo()
  const products = await ProductModel.find().sort({ createdAt: -1 })
  return products
})

