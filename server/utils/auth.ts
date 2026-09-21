import type { H3Event } from 'h3'
import { createError, getCookie } from 'h3'
import { verifyToken } from './jwt'
import { prisma } from './prisma'

export const requireAuth = async (event: H3Event, role?: 'ADMIN' | 'CLIENTE') => {
  const token = getCookie(event, 'auth_token')
  const payload = token ? verifyToken(token) : null

  if (!payload) {
    throw createError({ statusCode: 401, statusMessage: 'Sesión inválida o expirada' })
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.id },
    select: { id: true, fullName: true, email: true, role: true }
  })

  if (!user || (role && user.role !== role)) {
    throw createError({ statusCode: 403, statusMessage: 'No tienes permisos para realizar esta acción' })
  }

  return user
}

export const requireUserAccess = async (event: H3Event, userId: string) => {
  const user = await requireAuth(event)

  if (user.id !== userId) {
    throw createError({ statusCode: 403, statusMessage: 'No puedes acceder a este carrito' })
  }

  return user
}