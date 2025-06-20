import { Report } from '@/models/report'; // Changed from Client to Report
import { connectDB } from '@/lib/database';
import { success, internalServerError } from '@/lib/response-mapper';

export async function GET() {
  await connectDB();

  try {
    const rawReports = await Report
      .find()
      .select('_id date holiday status') // Select report-specific fields
      .sort({ date: -1 }); // Sort by date instead of createdAt

    const reports = rawReports.map((report) => ({
      id: report._id.toString(),
      date: report.date,
      holiday: report.holiday,
      status: report.status,
    }));

    return success({ reports }); // Changed from clients to reports
  } catch (error: unknown) {
    if (error instanceof Error) {
      return internalServerError(error.message);
    }
    return internalServerError('Failed to fetch reports'); // Updated error message
  }
}