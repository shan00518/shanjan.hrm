import { connectDB } from '@/lib/database';
import { success, notFound, internalServerError } from '@/lib/response-mapper';
import {Invoice} from '@/models/invoice';
import { NextRequest } from 'next/server';

export async function DELETE(
    _: NextRequest,
    { params }: { params: Promise<{ invoiceId: string }> }
) {
    try {
        await connectDB();
        const { invoiceId } = await params;

        const invoice = await Invoice.findById(invoiceId);
        if (!invoice) return notFound('Invoice not found');

        await invoice.deleteOne();

        return success({}, 'Invoice deleted successfully');
    } catch (err: any) {
        return internalServerError(err.message);
    }
}
