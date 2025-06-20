import { Report } from '@/models/report'; // Changed from Client to Report
import { connectDB } from '@/lib/database';
import { success, internalServerError } from '@/lib/response-mapper';

export async function GET() {
  await connectDB();
  try {
    // Fetch all reports/holidays sorted by date (newest first)
    const reports = await Report.find()
      .sort({ date: -1 }) // Sort by holiday date instead of createdAt
      .lean(); // Convert to plain JavaScript objects

    // Format the response data
    const formattedReports = reports.map(report => ({
      id: report.id.toString(),
      date: report.date,
      day: report.day,
      holiday: report.holiday,
      status: report.status,
      description: report.description || '', // Optional field
      imageUrl: report.image?.url || null // Include image URL if exists
    }));

    return success({ reports: formattedReports }); // Changed from clients to reports
  } catch (error: unknown) {
    if (error instanceof Error) {
      return internalServerError(error.message);
    }
    return internalServerError('Failed to fetch holiday reports'); // Updated error message
  }
}