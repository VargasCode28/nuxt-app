import { writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { requireAuth } from '~~/server/utils/auth'




export default defineEventHandler(async (event) => {
  await requireAuth(event, 'ADMIN')
  const form = await readMultipartFormData(event)

  if (!form || form.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'No se recibió ningún archivo' })
  }

  const file = form.find(f => f.name === 'file')
  if (!file || !file.filename) {
    throw createError({ statusCode: 400, statusMessage: 'Archivo inválido' })
  }

  // Solo permite imágenes
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  if (!file.type || !allowedTypes.includes(file.type)) {
    throw createError({ statusCode: 400, statusMessage: 'Solo se permiten imágenes JPG, PNG, WEBP o GIF' })
  }

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'products')
  if (!existsSync(uploadsDir)) {
    await mkdir(uploadsDir, { recursive: true })
  }


  const ext = path.extname(file.filename)
  const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`
  const filePath = path.join(uploadsDir, uniqueName)

  await writeFile(filePath, file.data)



  

  
  // Ruta pública accesible desde el navegador
  return { url: `/uploads/products/${uniqueName}` }
})