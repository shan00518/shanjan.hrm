import {Employee} from '@/models/employee';
import { connectDB } from '@/lib/database';
import { success, internalServerError } from '@/lib/response-mapper';

export async function GET() {
    await connectDB();
    try {
        const employees = await Employee.find().sort({ createdAt: -1 });
        return success({ employees });
    } catch (error: any) {
        return internalServerError(error.message);
    }
}