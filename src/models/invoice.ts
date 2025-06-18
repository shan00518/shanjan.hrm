import { Schema, model, models, Types } from 'mongoose';

export interface IInvoice {
    invoiceNumber: string;
    billTo: Types.ObjectId;
    shipTo?: string;
    date?: Date;
    paymentTerms?: string;
    dueDate?: Date;
    poNumber?: string;
    items: {
        project: Types.ObjectId;
        quantity: number;
        rate: number;
        amount: number;
    }[];
    notes?: string;
    terms?: string;
    tax?: number;
    discount?: number;
    shipping?: number;
    subtotal: number;
    total: number;
    amountPaid: number;
    remainingAmount: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const ItemSchema = new Schema(
    {
        project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
        quantity: { type: Number, required: true },
        rate: { type: Number, required: true },
        amount: { type: Number, required: true },
    },
    { _id: false }
);


const InvoiceSchema = new Schema<IInvoice>(
    {
        invoiceNumber: { type: String, required: true, unique: true },
        billTo: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
        shipTo: { type: String },
        date: { type: Date },
        paymentTerms: { type: String },
        dueDate: { type: Date },
        poNumber: { type: String },
        items: { type: [ItemSchema], required: true },
        notes: { type: String },
        terms: { type: String },
        tax: { type: Number, default: 0 },
        discount: { type: Number, default: 0 },
        shipping: { type: Number, default: 0 },
        subtotal: { type: Number, required: true },
        total: { type: Number, required: true },
        amountPaid: { type: Number, default: 0 },
        remainingAmount: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);

export const Invoice = models.Invoice || model<IInvoice>('Invoice', InvoiceSchema);
