import { connectDB } from '@/lib/database';
import { Timesheet } from '@/models/timesheet';
import { success, internalServerError } from '@/lib/response-mapper';

export async function GET() {
  try {
    await connectDB();

    const timesheets = await Timesheet.find()
      .populate('employeeId', 'firstName lastName designation') 
      .sort({ checkInTime: -1 }) 
      .lean(); // return plain JS objects

    return success({ timesheets });
  } catch (error) {
    console.error('Timesheet List Error:', error);
    return internalServerError('Failed to fetch timesheet entries');
  }
}
