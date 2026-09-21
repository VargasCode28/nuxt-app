import { connectMongo } from '~~/server/utils/mongodb'
import { ProductModel } from '~~/server/models/product.model'
import { requireAuth } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  await requireAuth(event, 'ADMIN')
  await connectMongo()

  const body = await readBody(event)
  const { name, category, price, image, description, stock } = body

  if (!name || !category || !price) {
    throw createError({ statusCode: 400, statusMessage: 'Nombre, categoría y precio son obligatorios' })
  }

  const product = await ProductModel.create({ name, category, price, image, description, stock })
  return product
})