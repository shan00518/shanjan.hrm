// app/api/employee/[employeeCode]/route.ts

import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/database';
import { Employee } from '@/models/employee';
import {
  success,
  notFound,
  internalServerError
} from '@/lib/response-mapper';
import { deleteFromCloudinary } from '@/lib/cloudinary';

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ employeeCode: string }> }
) {
  await connectDB();

  try {
    const { employeeCode } = await params;
    const emp = await Employee.findById(employeeCode);
    if (!emp) return notFound('Employee not found');

    // Delete avatar if exists
    if (emp.avatar?.publicId) {
      await deleteFromCloudinary(emp.avatar.publicId);
    }

    // Delete documents from Cloudinary
    const docKeys = ['cv', 'appointmentLetter', 'experienceLetter', 'salarySlips'] as const;

    for (const docKey of docKeys) {
      const document = emp.documents?.[docKey] as { publicId?: string } | undefined;
      if (document?.publicId) {
        await deleteFromCloudinary(document.publicId);
      }
    }

    await emp.deleteOne();
    return success({ message: 'Employee deleted' });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return internalServerError(err.message);
    }
    return internalServerError('An unexpected error occurred while deleting the employee');
  }
}
