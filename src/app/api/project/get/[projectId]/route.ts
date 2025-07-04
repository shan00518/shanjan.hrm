/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from 'next/server';
import { Project } from '@/models/project';
import { connectDB } from '@/lib/database';
import { success, notFound, internalServerError } from '@/lib/response-mapper';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ projectId: string }> }
) {
    await connectDB();

    try {
        const { projectId } = await params;
        const project = await Project.findById(projectId)
            .populate('client', 'name')
            // .populate('employees', 'firstName lastName');
        if (!project) return notFound('Project not found');

        return success({ project });
    } catch (error: any) {
        return internalServerError(error.message);
    }
}
