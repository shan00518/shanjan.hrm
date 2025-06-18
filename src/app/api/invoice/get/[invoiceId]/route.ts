import { connectDB } from '@/lib/database';
import { success, notFound } from '@/lib/response-mapper';
import {Invoice} from '@/models/invoice';
import { NextRequest } from 'next/server';

export async function GET(
    _: NextRequest,
    { params }: { params: Promise<{ invoiceId: string }> }
) {
    await connectDB();
    const { invoiceId } = await params;
    const invoice = await Invoice.findById(invoiceId)
        // .populate('billTo', 'name email phone location')
        // .populate('items.project', 'name');
    if (!invoice) return notFound('Invoice not found');
    return success({ invoice });
}