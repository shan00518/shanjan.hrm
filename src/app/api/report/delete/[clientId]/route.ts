import { NextRequest } from 'next/server';
import { Report } from '@/models/report'; // Changed from Client to Report
import { connectDB } from '@/lib/database';
import { success, notFound, internalServerError } from '@/lib/response-mapper';
import { deleteFromCloudinary } from '@/lib/cloudinary';

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { reportId: string } } // Changed from clientId to reportId
) {
  await connectDB();

  try {
    const { reportId } = params; // Changed from clientId to reportId
    const report = await Report.findById(reportId);

    if (!report) return notFound('Report not found');

    // Delete associated image from Cloudinary if exists
    if (report.image?.publicId) { // Changed from avatar to image
      await deleteFromCloudinary(report.image.publicId);
    }

    await report.deleteOne();

    return success({ message: 'Report deleted successfully' }); // Updated message
  } catch (error: unknown) {
    if (error instanceof Error) {
      return internalServerError(error.message);
    }
    return internalServerError('Unknown error occurred');
  }
}