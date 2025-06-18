import { Client } from '@/models/client';
import { connectDB } from '@/lib/database';
import { success, internalServerError } from '@/lib/response-mapper';

export async function GET() {
    await connectDB();
    try {
        const clients = await Client.find().sort({ createdAt: -1 });
        return success({ clients });
    } catch (error: any) {
        return internalServerError(error.message);
    }
}