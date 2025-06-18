import { deleteFromCloudinary, uploadToCloudinary } from '@/lib/cloudinary';
import { connectDB } from '@/lib/database';
import {
    internalServerError,
    notFound,
    success
} from '@/lib/response-mapper';
import { Client } from '@/models/client';
import { NextRequest } from 'next/server';

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ clientId: string }> }
) {
    try {
        await connectDB();

        const formData = await req.formData();

        const name = formData.get('name')?.toString();
        const email = formData.get('email')?.toString()?.toLowerCase();
        const phone = formData.get('phone')?.toString();
        const location = formData.get('location')?.toString();
        const avatarFile = formData.get('avatar') as Blob | null;

        const updates: Record<string, unknown> = {};

        if (name) updates.name = name;
        if (email) updates.email = email;
        if (phone) updates.phone = phone;
        if (location) updates.location = location;

        const { clientId } = await params;
        const client = await Client.findById(clientId);
        if (!client) return notFound('Client not found');

        if (avatarFile && avatarFile.size > 0) {
            if (client.avatar?.publicId) {
                await deleteFromCloudinary(client.avatar.publicId);
            }
            const { publicId, secureUrl } = await uploadToCloudinary(avatarFile, 'clients/avatars');
            updates.avatar = { publicId, url: secureUrl };
        }

        const updatedClient = await Client.findByIdAndUpdate(clientId, updates, {
            new: true,
        });

        return success({ client: updatedClient }, 'Client updated successfully');
    } catch (error: unknown) {
        console.error('Client update error:', error);
        if (error instanceof Error) {
            return internalServerError(error.message);
        }
        return internalServerError('An unexpected error occurred while updating the client');
    }
}
