import { Schema, model, models, Document, Types } from 'mongoose';

export type ProjectStatus = 'pending' | 'in_progress' | 'completed';

export interface IProject extends Document {
    client: Types.ObjectId;
    employees: Types.ObjectId[];
    name: string;
    description?: string;
    startDate: Date;
    endDate?: Date;
    price?: number;
    status: ProjectStatus;
    createdAt: Date;
    updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
    {
        client: {
            type: Schema.Types.ObjectId,
            ref: 'Client',
            required: true,
        },
        employees: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Employee',
            },
        ],
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        price: {
            type: Number,
            trim: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
        },
        status: {
            type: String,
            enum: ['pending', 'in_progress', 'completed'],
            default: 'pending',
        },
    },
    {
        timestamps: true,
    }
);

export const Project = models.Project || model<IProject>('Project', ProjectSchema);
