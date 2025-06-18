import jwt, { SignOptions } from 'jsonwebtoken';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET!;
type TokenPayload = { role: 'ADMIN' };

export function signToken(payload: TokenPayload, expiresIn: SignOptions['expiresIn'] = '1d'): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export async function verifyToken(token: string) {
  if (!token) throw new Error('No token');
  const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
  return payload as { role: string; iat: number; exp: number };
}