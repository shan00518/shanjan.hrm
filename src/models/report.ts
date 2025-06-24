import { Schema, model, models, Document } from 'mongoose';

export interface IReport extends Document {
    date: string;
    day: string;
    holiday: string;
    status: 'On' | 'Off';
    description?: string;
    image?: {
        publicId: string;
        url: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

const ReportSchema = new Schema<IReport>(
    {
        date: {
            type: String,
            required: true,
            trim: true,
        },
        day: {
            type: String,
            required: true,
            trim: true,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        },
        holiday: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            required: true,
            enum: ['On', 'Off'],
            default: 'Off'
        },
        description: {
            type: String,
            trim: true,
        },
        image: {
            publicId: { type: String, trim: true },
            url: { type: String, trim: true },
        },
    },
    {
        timestamps: true,
    }
);

export const Report = models.Report || model<IReport>('Report', ReportSchema);