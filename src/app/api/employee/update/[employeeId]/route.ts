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
import {Employee} from '@/models/employee';
import { NextRequest } from 'next/server';


export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ employeeId: string }> }
) {
    await connectDB();
    try {
        const { employeeId } = await params;
        const emp = await Employee.findById(employeeId);
        if (!emp) return notFound('Employee not found');

        const form = await req.formData();
        const updates: Record<string, any> = {};

        for (const key of [
            'firstName', 'lastName', 'mobile', 'email',
            'nationality', 'address', 'city', 'state', 'zipCode',
            'department', 'designation', 'branch',
            'slackId', 'githubId', 'linkedInId'
        ]) {
            const v = form.get(key)?.toString();
            if (v) updates[key] = v;
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

        for (const enumKey of ['maritalStatus', 'gender', 'employeeType'] as const) {
            const v = form.get(enumKey)?.toString();
            if (v) updates[enumKey] = v;
        }

        const avatarFile = form.get('avatar') as Blob | null;
        if (avatarFile && avatarFile.size > 0) {
            if (emp.avatar?.publicId) {
                await deleteFromCloudinary(emp.avatar.publicId);
            }
            const { publicId, secureUrl } = await uploadToCloudinary(avatarFile, 'employees/avatars');
            updates.avatar = { publicId, url: secureUrl };
        }

        const cvFile = form.get('cv') as Blob | null;
        if (cvFile && cvFile.size > 0) {
            if (emp.documents?.cv?.publicId) {
                await deleteFromCloudinary(emp.documents.cv.publicId);
            }
            const { publicId, secureUrl } = await uploadToCloudinary(cvFile, 'employees/docs');
            updates['documents.cv'] = { publicId, url: secureUrl };
        }

        const appointmentLetterFile = form.get('appointmentLetter') as Blob | null;
        if (appointmentLetterFile && appointmentLetterFile.size > 0) {
            if (emp.documents?.appointmentLetter?.publicId) {
                await deleteFromCloudinary(emp.documents.appointmentLetter.publicId);
            }
            const { publicId, secureUrl } = await uploadToCloudinary(appointmentLetterFile, 'employees/docs');
            updates['documents.appointmentLetter'] = { publicId, url: secureUrl };
        }

        const salarySlipsFile = form.get('salarySlips') as Blob | null;
        if (salarySlipsFile && salarySlipsFile.size > 0) {
            if (emp.documents?.salarySlips?.publicId) {
                await deleteFromCloudinary(emp.documents.salarySlips.publicId);
            }
            const { publicId, secureUrl } = await uploadToCloudinary(salarySlipsFile, 'employees/docs');
            updates['documents.salarySlips'] = { publicId, url: secureUrl };
        }

        const experienceLetterFile = form.get('experienceLetter') as Blob | null;
        if (experienceLetterFile && experienceLetterFile.size > 0) {
            if (emp.documents?.experienceLetter?.publicId) {
                await deleteFromCloudinary(emp.documents.experienceLetter.publicId);
            }
            const { publicId, secureUrl } = await uploadToCloudinary(experienceLetterFile, 'employees/docs');
            updates['documents.experienceLetter'] = { publicId, url: secureUrl };
        }

        const updated = await Employee.findByIdAndUpdate(employeeId, updates, { new: true });
        return success({ employee: updated }, 'Employee updated');
    } catch (err: any) {
        return internalServerError(err.message);
    }
}