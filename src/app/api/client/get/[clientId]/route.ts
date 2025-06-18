import { NextRequest } from 'next/server';
import { Client } from '@/models/client';
import { connectDB } from '@/lib/database';
import { success, notFound, internalServerError } from '@/lib/response-mapper';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ clientId: string }> }
) {
    await connectDB();

    try {
        const { clientId } = await params;
        const client = await Client.findById(clientId);
        if (!client) return notFound('Client not found');

        return success({ client });
    } catch (error: any) {
        return internalServerError(error.message);
    }
}
