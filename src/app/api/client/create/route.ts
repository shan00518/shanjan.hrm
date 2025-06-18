import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/database';
import { uploadToCloudinary } from '@/lib/cloudinary';
import {
    success,
    badRequest,
    internalServerError,
} from '@/lib/response-mapper';
import { Client, IClient } from '@/models/client';

export async function POST(req: NextRequest) {
    await connectDB();

    try {
        const form = await req.formData();

        const name = form.get('name')?.toString();
        if (!name) {
            return badRequest('Name is required');
        }

        const payload: Partial<IClient> = {
            name,
            email: form.get('email')?.toString()?.toLowerCase() || '',
            phone: form.get('phone')?.toString() || '',
            location: form.get('location')?.toString() || '',
        };

        const avatarFile = form.get('avatar') as Blob | null;
        if (avatarFile && avatarFile.size > 0) {
            const { publicId, secureUrl } = await uploadToCloudinary(avatarFile, 'clients/avatars');
            payload.avatar = { publicId, url: secureUrl };
        }

        const newClient = await Client.create(payload);
        return success({ client: newClient }, 'Client created successfully');
    } catch (err: any) {
        return internalServerError(err.message);
    }
}