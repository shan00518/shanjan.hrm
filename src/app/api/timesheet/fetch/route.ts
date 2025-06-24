import { Timesheet } from '@/models/timesheet';
import { connectDB } from '@/lib/database';
import { success, internalServerError } from '@/lib/response-mapper';

export async function GET() {
  await connectDB();

  try {
    const timesheets = await Timesheet
      .find({})
      .select('_id checktime status')
      .populate('employee', 'name') // Assuming 'employee' is a reference to an Employee model
      .sort({ checktime: -1 }); // Sorting by checktime (most recent first)

    return success({ timesheets });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return internalServerError(error.message);
    }
    return internalServerError('An unknown error occurred');
  }
}