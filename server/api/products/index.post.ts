import { connectMongo } from '~~/server/utils/mongodb'
import { ProductModel } from '~~/server/models/product.model'

export default defineEventHandler(async (event) => {
  await connectMongo()

  const body = await readBody(event)
  const { name, category, price, image, description, stock } = body

  if (!name || !category || !price) {
    throw createError({ statusCode: 400, statusMessage: 'Nombre, categoría y precio son obligatorios' })
  }

  const product = await ProductModel.create({ name, category, price, image, description, stock })
  return product
})