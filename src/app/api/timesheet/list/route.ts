import { Timesheet } from '@/models/timesheet';
import { connectDB } from '@/lib/database';
import { success, internalServerError } from '@/lib/response-mapper';

export async function GET() {
  await connectDB();
  try {
    const timesheets = await Timesheet.find()
      .sort({ checktime: -1 }) // Sort by checktime (newest first)
      .lean(); // Convert to plain JavaScript objects
    
    // Transform the data for better client-side consumption
    const formattedTimesheets = timesheets.map(timesheet => ({
      id: timesheet.id.toString(),
      employeeName: timesheet.employeeName,
      designation: timesheet.designation,
      checktime: timesheet.checktime.toISOString(),
      status: timesheet.status,
      duration: timesheet.duration // Adding duration if available
    }));

    return success({ timesheets: formattedTimesheets });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return internalServerError(error.message);
    }
    return internalServerError('Failed to fetch timesheet entries');
  }
}