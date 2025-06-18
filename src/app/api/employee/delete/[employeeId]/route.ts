// app/api/employee/[id]/route.ts
import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/database';
import {Employee} from '@/models/employee';
import {
    success,
    notFound,
    badRequest,
    internalServerError
} from '@/lib/response-mapper';
import {
    uploadToCloudinary,
    deleteFromCloudinary
} from '@/lib/cloudinary';

export async function DELETE(
    _: NextRequest,
    { params }: { params: Promise<{ employeeId: string }> }
) {
    await connectDB();
    try {
        const { employeeId } = await params;
        const emp = await Employee.findById(employeeId);
        if (!emp) return notFound('Employee not found');

        if (emp.avatar?.publicId) {
            await deleteFromCloudinary(emp.avatar.publicId);
        }
        for (const docKey of ['cv', 'appointmentLetter', 'experienceLetter', 'salarySlips'] as const) {
            const doc = (emp.documents as any)[docKey];
            if (doc?.publicId) {
                await deleteFromCloudinary(doc.publicId);
            }
        }

        await emp.deleteOne();
        return success({ message: 'Employee deleted' });
    } catch (err: any) {
        return internalServerError(err.message);
    }
}
