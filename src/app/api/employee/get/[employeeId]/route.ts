import { connectDB } from '@/lib/database';
import {
    notFound,
    success
} from '@/lib/response-mapper';
import {Employee} from '@/models/employee';
import { NextRequest } from 'next/server';

export async function GET(
    _: NextRequest,
    { params }: { params: Promise<{ employeeCode: string }> }
) {
    await connectDB();
    const {employeeCode } = await params;
    const emp = await Employee.findById(employeeCode);
    if (!emp) return notFound('Employee not found');
    return success({ employee: emp });
}