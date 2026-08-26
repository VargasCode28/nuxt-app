import { verifyToken } from '~~/server/utils/jwt'
import { prisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token')
  if (!token) return null

  const payload = verifyToken(token)
  if (!payload) return null


  const user = await prisma.user.findUnique({ where: { id: payload.id } })
  if (!user) return null

  
  return { id: user.id, fullName: user.fullName, email: user.email, role: user.role }
})

