import { connectMongo } from '~~/server/utils/mongodb'
import { ProductModel } from '~~/server/models/product.model'
import { requireAuth } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  await requireAuth(event, 'ADMIN')
  await connectMongo()

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Falta el id del producto' })
  }

  const product = await ProductModel.findByIdAndDelete(id)

  if (!product) {
    throw createError({ statusCode: 404, statusMessage: 'Producto no encontrado' })
  }

  return { success: true, deletedId: id }
})
