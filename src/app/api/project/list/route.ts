/* eslint-disable @typescript-eslint/no-explicit-any */

import { Project } from '@/models/project';
import { connectDB } from '@/lib/database';
import { success, internalServerError } from '@/lib/response-mapper';

export async function GET() {
    await connectDB();
    try {
        const projects = await Project.find()
            // .populate('client', 'name email phone location')
            // .populate('employees', 'firstName lastName email')
            .sort({ createdAt: -1 });
        return success({ projects });
    } catch (error: any) {
        return internalServerError(error.message);
    }
}
