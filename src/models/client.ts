import { Schema, model, models, Document } from 'mongoose';

export interface IClient extends Document {
    name: string;
    email?: string;
    phone?: string;
    location?: string;
    status ?: 'active' | 'inactive';
    avatar?: {
    publicId: string;
    url: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

const ClientSchema = new Schema<IClient>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            lowercase: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        location: {
            type: String,
            trim: true,
        },
         status: {
            type: String,
            trim: true,
        },
        avatar: {
            publicId: { type: String, trim: true },
            url: { type: String, trim: true },
        },
    },
    {
        timestamps: true,
    }
);

export const Client = models.Client || model<IClient>('Client', ClientSchema);
