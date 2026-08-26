import { connectMongo } from '~~/server/utils/mongodb'
import { ProductModel } from '~~/server/models/product.model'

export default defineEventHandler(async (event) => {
  await connectMongo()

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Falta el id del producto' })
  }

  const body = await readBody(event)
  const { name, category, price, image, description, stock } = body

  const product = await ProductModel.findByIdAndUpdate(
    id,
    { name, category, price, image, description, stock },
    { new: true }
  )

  if (!product) {
    throw createError({ statusCode: 404, statusMessage: 'Producto no encontrado' })
  }

  return product
})