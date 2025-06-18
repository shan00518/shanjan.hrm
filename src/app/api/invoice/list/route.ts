import { connectDB } from '@/lib/database';
import { success, internalServerError } from '@/lib/response-mapper';
import { Invoice } from '@/models/invoice';
import { Client } from '@/models/client';

export async function GET() {
    await connectDB();
    try {
        const invoices = await Invoice.find()
        // .populate('billTo', 'name email phone location')
        // .populate('items.project', 'name');
        
        return success({ invoices }, 'Invoices fetched successfully');
    } catch (err: any) {
        return internalServerError(err.message);
    }
}
