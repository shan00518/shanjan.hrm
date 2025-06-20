import { NextRequest } from 'next/server';
import { Report } from '@/models/report'; // Changed from Client to Report
import { connectDB } from '@/lib/database';
import { success, notFound, internalServerError } from '@/lib/response-mapper';

export async function GET(
  req: NextRequest,
  { params }: { params: { reportId: string } }
) {
  await connectDB();

  try {
    const { reportId } = params;
    const report = await Report.findById(reportId);
    
    if (!report) return notFound('Holiday report not found');

    return success({ 
      report: {
        id: report._id.toString(),
        date: report.date,
        day: report.day,
        holidayName: report.holiday,
        status: report.status,
        description: report.description || '',
        image: report.image || null,
        createdAt: report.createdAt,
        updatedAt: report.updatedAt
      }
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return internalServerError(error.message);
    }
    return internalServerError('Failed to fetch holiday report');
  }
}