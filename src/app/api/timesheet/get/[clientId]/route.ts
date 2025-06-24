import { NextRequest } from 'next/server';
import { Timesheet } from '@/models/timesheet';
import { connectDB } from '@/lib/database';
import { success, notFound, internalServerError } from '@/lib/response-mapper';

export async function GET(
  req: NextRequest,
  { params }: { params: { timesheetId: string } }
) {
  await connectDB();

  try {
    const { timesheetId } = params;
    const timesheet = await Timesheet.findById(timesheetId);
    
    if (!timesheet) return notFound('Timesheet entry not found');

    return success({ 
      timesheet: {
        id: timesheet._id.toString(),
        employeeName: timesheet.employeeName,
        designation: timesheet.designation,
        checktime: timesheet.checktime,
        status: timesheet.status
      }
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return internalServerError(error.message);
    }
    return internalServerError('An unknown error occurred');
  }
}