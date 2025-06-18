import { Employee } from '@/models/employee';
import { connectDB } from '@/lib/database';
import { success, internalServerError } from '@/lib/response-mapper';

export async function GET() {
  await connectDB();

  try {
    const rawEmployees = await Employee
      .find()
      .select('firstName lastName')
      .sort({ createdAt: -1 });

    const employees = rawEmployees.map((e) => ({
      id: e._id.toString(),
      name: `${e.firstName} ${e.lastName}`,
    }));

    return success({ employees });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return internalServerError(error.message);
    }
    return internalServerError('An unexpected error occurred while fetching employees.');
  }
}
