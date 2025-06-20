// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { unauthorized } from '@/lib/response-mapper';
import { verifyToken } from '@/lib/jwt';

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('admin_token')?.value;
    const { pathname } = req.nextUrl;

    const isLoginPage = pathname === '/login';
    const isApiRoute = pathname.startsWith('/api');

    if (isLoginPage || pathname === '/api/auth/login') {
        return NextResponse.next();
    }

    if (!token) {
        if (isApiRoute) {
            const rawResponse = unauthorized('Unauthorized access');
            const body = await rawResponse.text();
            return new NextResponse(body, {
                status: rawResponse.status,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    try {
        const decoded = await verifyToken(token);
        if (decoded.role !== 'ADMIN') throw new Error();

        if (isLoginPage) {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.error('Middleware auth error:', error);

        if (isApiRoute) {
            const rawResponse = unauthorized('Unauthorized access');
            const body = await rawResponse.text();
            return new NextResponse(body, {
                status: rawResponse.status,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }
}

export const config = {
    matcher: [
        '/((?!_next|favicon.ico|images|fonts|api/public).*)',
    ],
};



