import { Schema, model, models, Document } from 'mongoose';

const MaritalStatusEnum = ['single', 'married', 'divorced', 'widowed'] as const;
const GenderEnum = ['male', 'female', 'other'] as const;
const EmployeeTypeEnum = ['educated', 'uneducated'] as const;

export interface IEmployee extends Document {
    firstName: string;
    lastName: string;
    email: string;
    mobile?: string;
    avatar?: {
        publicId: string;
        url: string;
    };
    dateOfBirth?: Date;
    dateOfJoining?: Date;
    maritalStatus?: typeof MaritalStatusEnum[number];
    gender?: typeof GenderEnum[number];
    nationality?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    employeeCode?: string;
    username?: string;
    employeeType?: typeof EmployeeTypeEnum[number];
    department?: string;
    designation?: string;
    workingDays?: number;
    branch?: string;
    documents?: {
        appointmentLetter?: { publicId: string; url: string };
        salarySlips?: { publicId: string; url: string };
        experienceLetter?: { publicId: string; url: string };
        cv?: { publicId: string; url: string };
    };
    slackId?: string;
    githubId?: string;
    linkedInId?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const EmployeeSchema = new Schema<IEmployee>(
    {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        mobile: { type: String, trim: true },
        avatar: {
            publicId: { type: String, trim: true },
            url: { type: String, trim: true },
        },
        dateOfBirth: { type: Date },
        dateOfJoining: { type: Date },
        maritalStatus: { type: String, enum: MaritalStatusEnum },
        gender: { type: String, enum: GenderEnum },
        nationality: { type: String, trim: true },
        address: { type: String, trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        zipCode: { type: String, trim: true },
        employeeCode: { type: String, trim: true },
        username: { type: String, trim: true },
        employeeType: { type: String, enum: EmployeeTypeEnum },
        department: { type: String, trim: true },
        designation: { type: String, trim: true },
        workingDays: { type: Number },
        branch: { type: String, trim: true },
        documents: {
            appointmentLetter: { publicId: String, url: String },
            salarySlips: { publicId: String, url: String },
            experienceLetter: { publicId: String, url: String },
            cv: { publicId: String, url: String },
        },
        slackId: { type: String, trim: true },
        githubId: { type: String, trim: true },
        linkedInId: { type: String, trim: true },
        isActive: { type: Boolean, default: true },
    },
    {
        timestamps: true,
    }
);

export const Employee = models.Employee || model<IEmployee>('Employee', EmployeeSchema);