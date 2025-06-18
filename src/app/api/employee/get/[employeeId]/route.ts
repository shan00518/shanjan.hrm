import { connectDB } from '@/lib/database';
import {
    notFound,
    success
} from '@/lib/response-mapper';
import {Employee} from '@/models/employee';
import { NextRequest } from 'next/server';

export async function GET(
    _: NextRequest,
    { params }: { params: Promise<{ employeeId: string }> }
) {
    await connectDB();
    const { employeeId } = await params;
    const emp = await Employee.findById(employeeId);
    if (!emp) return notFound('Employee not found');
    return success({ employee: emp });
}