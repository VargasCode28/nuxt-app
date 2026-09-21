import bcrypt from 'bcrypt'
import { prisma } from '~~/server/utils/prisma'
import { verifyToken } from '~~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token')
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Debes iniciar sesión para actualizar tu perfil' })
  }

  const payload = verifyToken(token)
  if (!payload) {
    throw createError({ statusCode: 401, statusMessage: 'Sesión inválida o expirada' })
  }

  const body = await readBody(event)
  const fullName = typeof body?.fullName === 'string' ? body.fullName.trim() : ''
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
  const password = typeof body?.password === 'string' ? body.password.trim() : ''

  if (!fullName || !email) {
    throw createError({ statusCode: 400, statusMessage: 'Nombre y correo son obligatorios' })
  }

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser && existingUser.id !== payload.id) {
    throw createError({ statusCode: 409, statusMessage: 'Este correo ya está registrado' })
  }

  const updatedUser = await prisma.user.update({
    where: { id: payload.id },
    data: {
      fullName,
      email,
      ...(password ? { password: await bcrypt.hash(password, 10) } : {})
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      createdAt: true
    }
  })

  return {
    id: updatedUser.id,
    fullName: updatedUser.fullName,
    email: updatedUser.email,
    role: updatedUser.role,
    createdAt: updatedUser.createdAt.toISOString()
  }
})
