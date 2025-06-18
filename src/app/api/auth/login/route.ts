import { NextRequest } from 'next/server';
import { verifyAdminKey } from '@/lib/admin-auth';
import { signToken } from '@/lib/jwt';
import { success, badRequest, unauthorized } from '@/lib/response-mapper';

export async function POST(req: NextRequest) {
  const { secretKey } = await req.json();

  if (!secretKey) return badRequest('Secret key is required');

  if (!verifyAdminKey(secretKey)) return unauthorized('Invalid secret key');

  const token = signToken({ role: 'ADMIN' });
  const response = success({ message: 'Authenticated' });

  response.headers.set(
    'Set-Cookie',
    `admin_token=${token}; Path=/; HttpOnly; Max-Age=86400; Secure=${process.env.NODE_ENV === 'production'}; SameSite=Strict`
  );

  return response;
}