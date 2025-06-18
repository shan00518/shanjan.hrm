import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/database';
import {
    success,
    badRequest,
    internalServerError,
} from '@/lib/response-mapper';
import { Invoice } from '@/models/invoice';
import { Project } from '@/models/project';
import { Types } from 'mongoose';

export async function POST(req: NextRequest) {
    await connectDB();

    try {
        const body = await req.json();

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

        if (!invoiceNumber || !billTo || !Array.isArray(items) || items.length === 0) {
            return badRequest('invoiceNumber, billTo, and items are required');
        }

        const populatedItems = await Promise.all(
            items.map(async (item: { project: string; quantity: number }) => {
                const project = await Project.findById(item.project);

                if (!project) {
                    throw new Error(`Project not found with ID: ${item.project}`);
                }

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

        const subtotal = populatedItems.reduce((acc, item) => acc + item.amount, 0);
        const taxAmount = Number(tax);
        const discountAmount = Number(discount);
        const shippingAmount = Number(shipping);
        const total = subtotal + taxAmount + shippingAmount - discountAmount;
        const paid = Number(amountPaid);
        const remainingAmount = total - paid;

        const payload = {
            invoiceNumber,
            billTo: new Types.ObjectId(billTo),
            shipTo,
            date: date ? new Date(date) : new Date(),
            paymentTerms,
            dueDate: dueDate ? new Date(dueDate) : undefined,
            poNumber,
            items: populatedItems,
            notes,
            terms,
            tax: taxAmount,
            discount: discountAmount,
            shipping: shippingAmount,
            subtotal,
            total,
            amountPaid: paid,
            remainingAmount,
        };

        const newInvoice = await Invoice.create(payload);

        return success({ invoice: newInvoice }, 'Invoice created successfully');
    } catch (error: any) {
        console.error('Invoice creation error:', error);
        return internalServerError(error.message || 'Failed to create invoice');
    }
}
