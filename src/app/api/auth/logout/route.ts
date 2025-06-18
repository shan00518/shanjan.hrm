import { success } from '@/lib/response-mapper';

export async function POST() {
    const response = success({ message: 'Logged out' });
    response.headers.set('Set-Cookie', 'admin_token=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict');
    return response;
}
