import { NextRequest } from 'next/server';
import { Client } from '@/models/client';
import { connectDB } from '@/lib/database';
import { success, notFound, internalServerError } from '@/lib/response-mapper';
import { deleteFromCloudinary } from '@/lib/cloudinary';

export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ clientId: string }> }
) {
    await connectDB();

    try {
        const { clientId } = await params;
        const client = await Client.findById(clientId);

        if (!client) return notFound('Client not found');

        if (client.avatar?.publicId) {
            await deleteFromCloudinary(client.avatar.publicId);
        }

        await client.deleteOne();

        return success({ message: 'Client deleted successfully' });
    } catch (error: any) {
        return internalServerError(error.message);
    }
}
