import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/database';
import { Employee, IEmployee } from '@/models/employee';
import {
    success,
    badRequest,
    internalServerError
} from '@/lib/response-mapper';
import { uploadToCloudinary } from '@/lib/cloudinary';


export async function POST(req: NextRequest) {
    await connectDB();
    try {
        const form = await req.formData();

        const firstName = form.get('firstName')?.toString();
        const lastName = form.get('lastName')?.toString();
        const email = form.get('email')?.toString()?.toLowerCase();
        if (!firstName || !lastName || !email) {
            return badRequest('firstName, lastName and email are required');
        }

        const payload: Partial<IEmployee> = {
            firstName,
            lastName,
            mobile: form.get('mobile')?.toString() || '',
            email,
            dateOfBirth: form.get('dateOfBirth') ? new Date(form.get('dateOfBirth')!.toString()) : new Date(),
            dateOfJoining: form.get('dateOfJoining') ? new Date(form.get('dateOfJoining')!.toString()) : new Date(),
            maritalStatus: ['single', 'married'].includes(form.get('maritalStatus')?.toString() || '')
                ? (form.get('maritalStatus') as 'single' | 'married')
                : 'single',
            gender: ['male', 'female', 'other'].includes(form.get('gender')?.toString() || '') 
                ? (form.get('gender') as 'male' | 'female' | 'other') 
                : 'male',
            nationality: form.get('nationality')?.toString() || '',
            address: form.get('address')?.toString() || '',
            city: form.get('city')?.toString() || '',
            state: form.get('state')?.toString() || '',
            zipCode: form.get('zipCode')?.toString() || '',
            employeeId: form.get('employeeId')?.toString() || '',
            username: form.get('username')?.toString() || '',
            employeeType: ['educated', 'uneducated'].includes(form.get('employeeType')?.toString() || '')
                ? (form.get('employeeType') as 'educated' | 'uneducated')
                : 'educated',
            department: form.get('department')?.toString() || '',
            designation: form.get('designation')?.toString() || '',
            workingDays: Number(form.get('workingDays') || 5),
            branch: form.get('branch')?.toString() || '',
            slackId: form.get('slackId')?.toString() || undefined,
            githubId: form.get('githubId')?.toString() || undefined,
            linkedInId: form.get('linkedInId')?.toString() || undefined,
        };

        const avatarFile = form.get('avatar') as Blob | null;
        if (avatarFile && avatarFile.size > 0) {
            const { publicId, secureUrl } = await uploadToCloudinary(avatarFile, 'employees/avatars');
            payload.avatar = { publicId, url: secureUrl };
        }

        const cvFile = form.get('cv') as Blob | null;
        if (cvFile && cvFile.size > 0) {
            const { publicId, secureUrl } = await uploadToCloudinary(cvFile, 'employees/docs');
            payload.documents = {
                ...payload.documents,
                cv: { publicId, url: secureUrl },
            };
        }

        const apptLetter = form.get('appointmentLetter') as Blob | null;
        if (apptLetter && apptLetter.size > 0) {
            const { publicId, secureUrl } = await uploadToCloudinary(apptLetter, 'employees/docs');
            payload.documents = {
                ...payload.documents,
                appointmentLetter: { publicId, url: secureUrl },
            };
        }

        const salarySlip = form.get('salarySlips') as Blob | null;
        if (salarySlip && salarySlip.size > 0) {
            const { publicId, secureUrl } = await uploadToCloudinary(salarySlip, 'employees/docs');
            payload.documents = {
                ...payload.documents,
                salarySlips: { publicId, url: secureUrl },
            };
        }

        const experienceLetter = form.get('experienceLetter') as Blob | null;
        if (experienceLetter && experienceLetter.size > 0) {
            const { publicId, secureUrl } = await uploadToCloudinary(experienceLetter, 'employees/docs');
            payload.documents = {
                ...payload.documents,
                experienceLetter: { publicId, url: secureUrl },
            };
        }

        const newEmp = await Employee.create(payload);
        return success({ employee: newEmp }, 'Employee created');
    } catch (err: any) {
        return internalServerError(err.message);
    }
}
