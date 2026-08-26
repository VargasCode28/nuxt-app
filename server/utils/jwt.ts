import jwt from 'jsonwebtoken'

export interface JwtPayload {
  id: string
  email: string
  role: 'ADMIN' | 'CLIENTE'
}

export const signToken = (payload: JwtPayload) => {
  const config = useRuntimeConfig()
  return jwt.sign(payload, config.jwtSecret as string, { expiresIn: '7d' })
}

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const config = useRuntimeConfig()
    return jwt.verify(token, config.jwtSecret as string) as JwtPayload
  } catch {
    return null
  }
}

