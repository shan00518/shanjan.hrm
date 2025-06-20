import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/database';
import { success, badRequest, internalServerError } from '@/lib/response-mapper';
import { Timesheet, ITimesheet } from '@/models/timesheet';

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const body = await req.json();
    const { employeeName, designation, checktime, status } = body;

    if (!employeeName) {
      return badRequest('Employee name is required');
    }
    if (!designation) {
      return badRequest('Designation is required');
    }
    if (!checktime) {
      return badRequest('Check time is required');
    }
    if (!status) {
      return badRequest('Status is required');
    }

    const payload: Partial<ITimesheet> = {
      employeeName,
      designation,
      checktime: new Date(checktime),
      status,
    };

    const newTimesheet = await Timesheet.create(payload);
    return success({ timesheet: newTimesheet }, 'Timesheet entry created successfully');
  } catch (err: unknown) {
    if (err instanceof Error) {
      return internalServerError(err.message);
    }
    return internalServerError('Unknown error occurred');
  }
}
