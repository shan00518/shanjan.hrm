import {
    deleteFromCloudinary,
    uploadToCloudinary
  } from '@/lib/cloudinary';
  import { connectDB } from '@/lib/database';
  import {
    internalServerError,
    notFound,
    success
  } from '@/lib/response-mapper';
  import { Employee } from '@/models/employee';
  import { NextRequest } from 'next/server';
  
  type Params = {
    employeeId: string;
  };
  
  export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<Params> }
  ) {
    await connectDB();
    try {
      const { employeeId } = await params;
      const emp = await Employee.findById(employeeId);
      if (!emp) return notFound('Employee not found');
  
      const form = await req.formData();
      const updates: Record<string, unknown> = {};
  
      const stringFields = [
        'firstName', 'lastName', 'mobile', 'email',
        'nationality', 'address', 'city', 'state', 'zipCode',
        'department', 'designation', 'branch',
        'slackId', 'githubId', 'linkedInId'
      ] as const;
  
      for (const key of stringFields) {
        const value = form.get(key)?.toString();
        if (value) updates[key] = value;
      }
  
      if (form.get('workingDays')) {
        updates.workingDays = Number(form.get('workingDays'));
      }
      if (form.get('dateOfBirth')) {
        updates.dateOfBirth = new Date(form.get('dateOfBirth')!.toString());
      }
      if (form.get('dateOfJoining')) {
        updates.dateOfJoining = new Date(form.get('dateOfJoining')!.toString());
      }
  
      const enums = ['maritalStatus', 'gender', 'employeeType'] as const;
      for (const key of enums) {
        const value = form.get(key)?.toString();
        if (value) updates[key] = value;
      }
  
      // Avatar
      const avatarFile = form.get('avatar') as File | null;
      if (avatarFile && avatarFile.size > 0) {
        if (emp.avatar?.publicId) {
          await deleteFromCloudinary(emp.avatar.publicId);
        }
        const { publicId, secureUrl } = await uploadToCloudinary(avatarFile, 'employees/avatars');
        updates.avatar = { publicId, url: secureUrl };
      }
  
      // Documents
      const documentFields = ['cv', 'appointmentLetter', 'salarySlips', 'experienceLetter'] as const;
      for (const docKey of documentFields) {
        const file = form.get(docKey) as File | null;
        if (file && file.size > 0) {
          const existingDoc = (emp.documents as Record<string, { publicId: string }>)[docKey];
          if (existingDoc?.publicId) {
            await deleteFromCloudinary(existingDoc.publicId);
          }
          const { publicId, secureUrl } = await uploadToCloudinary(file, 'employees/docs');
          updates[`documents.${docKey}`] = { publicId, url: secureUrl };
        }
      }
  
      const updated = await Employee.findByIdAndUpdate(employeeId, updates, { new: true });
      return success({ employee: updated }, 'Employee updated');
    } catch (err) {
      const error = err as Error;
      return internalServerError(error.message);
    }
  }
  