import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/database';
import { Invoice, IInvoice } from '@/models/invoice';
import { Project } from '@/models/project';
import {
    success,
    notFound,
    internalServerError,
} from '@/lib/response-mapper';
import { Types } from 'mongoose';

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ invoiceId: string }> }
) {
    try {
        await connectDB();
        const { invoiceId } = await params;
        const body = await req.json();

        const invoice = await Invoice.findById(invoiceId);
        if (!invoice) return notFound('Invoice not found');

        const {
            invoiceNumber,
            billTo,
            shipTo,
            date,
            paymentTerms,
            dueDate,
            poNumber,
            items,
            notes,
            terms,
            tax = 0,
            discount = 0,
            shipping = 0,
            amountPaid = 0,
        } = body;

        const updates: Partial<IInvoice> = {};

        if (invoiceNumber) updates.invoiceNumber = invoiceNumber;
        if (billTo) updates.billTo = new Types.ObjectId(billTo);
        if (shipTo) updates.shipTo = shipTo;
        if (date) updates.date = new Date(date);
        if (paymentTerms) updates.paymentTerms = paymentTerms;
        if (dueDate) updates.dueDate = new Date(dueDate);
        if (poNumber) updates.poNumber = poNumber;
        if (notes) updates.notes = notes;
        if (terms) updates.terms = terms;

        const taxAmount = Number(tax);
        const discountAmount = Number(discount);
        const shippingAmount = Number(shipping);
        const paid = Number(amountPaid);

        updates.tax = taxAmount;
        updates.discount = discountAmount;
        updates.shipping = shippingAmount;
        updates.amountPaid = paid;

        if (Array.isArray(items) && items.length > 0) {
            const populatedItems = await Promise.all(
                items.map(async (item: { project: string; quantity: number }) => {
                    const project = await Project.findById(item.project);
                    if (!project) throw new Error(`Project not found with ID: ${item.project}`);

                    const rate = Number(project.price);
                    const quantity = Number(item.quantity);

                    if (isNaN(rate)) throw new Error(`Invalid rate for project ${item.project}`);
                    if (isNaN(quantity)) throw new Error(`Invalid quantity for project ${item.project}`);

                    const amount = quantity * rate;

                    return {
                        project: new Types.ObjectId(item.project),
                        quantity,
                        rate,
                        amount,
                    };
                })
            );

            const subtotal = populatedItems.reduce((sum, item) => sum + item.amount, 0);
            const total = subtotal + taxAmount + shippingAmount - discountAmount;
            const remainingAmount = total - paid;

            updates.items = populatedItems;
            updates.subtotal = subtotal;
            updates.total = total;
            updates.remainingAmount = remainingAmount;
        }

        const updatedInvoice = await Invoice.findByIdAndUpdate(invoiceId, updates, {
            new: true,
        });

        return success({ invoice: updatedInvoice }, 'Invoice updated successfully');
    } catch (error: any) {
        console.error('Invoice update error:', error);
        return internalServerError(error.message || 'An error occurred while updating the invoice');
    }
}