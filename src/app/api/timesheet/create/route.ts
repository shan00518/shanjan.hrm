import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/database';
import { success, badRequest, internalServerError } from '@/lib/response-mapper';
import { Timesheet } from '@/models/timesheet';

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const body = await req.json();
    const { employeeId, checktime, status } = body;

    if (!employeeId) {
      return badRequest('Employee ID is required');
    }
  
    if (!checktime) {
      return badRequest('Check time is required');
    }
    if (!status) {
      return badRequest('Please add the status!');
    }

    const payload = {
      employeeId: employeeId,
      checktime: new Date(checktime),
      status
    };

    const newTimesheet = await Timesheet.create(payload);
    return success({ timesheet: newTimesheet }, 'Timesheet created successfully');
  } catch (err) {
    console.error('Error creating timesheet:', err);
    return internalServerError(err instanceof Error ? err.message : 'Unknown error');
  }
}