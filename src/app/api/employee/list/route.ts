import { Employee } from '@/models/employee';
import { connectDB } from '@/lib/database';
import { success, internalServerError } from '@/lib/response-mapper';

export async function GET() {
  await connectDB();
  try {
    const employees = await Employee.find()
    .select('firstName lastName employeeId department designation isActive')
    .sort({ _id: -1 });
    return success({ employees });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return internalServerError(error.message);
    }
    return internalServerError('An unknown error occurred while fetching employees.');
  }
}
