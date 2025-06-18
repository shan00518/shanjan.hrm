import { connectDB } from '@/lib/database';
import { success, internalServerError } from '@/lib/response-mapper';
import { Invoice } from '@/models/invoice';

export async function GET() {
  await connectDB();
  try {
    const invoices = await Invoice.find();
    return success({ invoices }, 'Invoices fetched successfully');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return internalServerError(message);
  }
}
