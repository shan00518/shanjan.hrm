import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/database';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { success, badRequest, internalServerError } from '@/lib/response-mapper';
import { Report, IReport } from '@/models/report'; // Changed from Client to Report

export async function POST(req: NextRequest) {
    await connectDB();
  
    try {
        const form = await req.formData();

        // Required fields for reports
        const date = form.get('date')?.toString();
        if (!date) {
            return badRequest('Date is required');
        }

        const day = form.get('day')?.toString();
        if (!day) {
            return badRequest('Day is required');
        }

        const holiday = form.get('holiday')?.toString();
        if (!holiday) {
            return badRequest('Holiday is required');
        }

        const statusValue = form.get('status')?.toString();
        const status: 'On' | 'Off' = statusValue === 'On' ? 'On' : 'Off'; // Default to 'Off'

        const payload: Partial<IReport> = {
            date,
            day,
            holiday,
            status,
            // Optional fields can be added here
            description: form.get('description')?.toString() || '',
        };

        // If you need file uploads for reports (e.g., holiday images)
        const imageFile = form.get('image') as Blob | null;
        if (imageFile && imageFile.size > 0) {
            const { publicId, secureUrl } = await uploadToCloudinary(
                imageFile, 
                'reports/holidays' // Changed path from clients/avatars
            );
            payload.image = { publicId, url: secureUrl };
        }

        const newReport = await Report.create(payload);
        return success({ report: newReport }, 'Report created successfully');
        
    } catch (err: unknown) {
        if (err instanceof Error) {
            return internalServerError(err.message);
        }
        return internalServerError('Unknown error occurred');
    }
}