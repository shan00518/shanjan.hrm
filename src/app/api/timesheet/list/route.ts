import { Timesheet } from '@/models/timesheet';
import { connectDB } from '@/lib/database';
import { success, internalServerError } from '@/lib/response-mapper';

export async function GET() {
  await connectDB();
  try {
    const timesheets = await Timesheet.find()
    .populate('employee', 'name designation') // Populate employee details
      .sort({ checktime: -1 }) // Sort by checktime (newest first)
      .lean(); // Convert to plain JavaScript objects

    return success({ timesheets });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return internalServerError(error.message);
    }
    return internalServerError('Failed to fetch timesheet entries');
  }
}