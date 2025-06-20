import { Timesheet } from '@/models/timesheet';
import { connectDB } from '@/lib/database';
import { success, internalServerError } from '@/lib/response-mapper';

export async function GET() {
  await connectDB();

  try {
    const rawTimesheets = await Timesheet
      .find()
      .select('_id employeeName checktime status')
      .sort({ checktime: -1 }); // Sorting by checktime (most recent first)

    const timesheets = rawTimesheets.map((t) => ({
      id: t._id.toString(),
      employeeName: t.employeeName,
      checktime: t.checktime,
      status: t.status
    }));

    return success({ timesheets });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return internalServerError(error.message);
    }
    return internalServerError('An unknown error occurred');
  }
}