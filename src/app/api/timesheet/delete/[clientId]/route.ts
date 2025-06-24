import { NextRequest } from 'next/server';
import { Timesheet } from '@/models/timesheet';
import { connectDB } from '@/lib/database';
import { success, notFound, internalServerError } from '@/lib/response-mapper';

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ timesheetId: string }> }
) {
  await connectDB();

  try {
    const { timesheetId } = await params;
    const timesheet = await Timesheet.findById(timesheetId);

    if (!timesheet) return notFound('Timesheet entry not found');

    await timesheet.deleteOne();

    return success({ message: 'Timesheet entry deleted successfully' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return internalServerError(error.message);
    }
    return internalServerError('Unknown error occurred');
  }
}