import { NextRequest } from 'next/server';
import { Report } from '@/models/report'; // Changed from Client to Report
import { connectDB } from '@/lib/database';
import { success, notFound, internalServerError } from '@/lib/response-mapper';

export async function GET(
  req: NextRequest,
  { params }: { params: { reportId: string } } // Changed to reportId and removed Promise
) {
  await connectDB();

  try {
    const { reportId } = params; // Destructured directly
    const report = await Report.findById(reportId);
    
    if (!report) return notFound('Report not found'); // Updated message

    return success({ 
      report: {
        id: report._id.toString(),
        date: report.date,
        day: report.day,
        holiday: report.holiday,
        status: report.status,
        description: report.description,
        image: report.image // Include image if exists
      }
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return internalServerError(error.message);
    }
    return internalServerError('Failed to fetch report'); // Updated message
  }
}