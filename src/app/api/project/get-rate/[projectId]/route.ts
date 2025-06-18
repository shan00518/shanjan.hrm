import { connectDB } from '@/lib/database';
import { success, notFound, internalServerError } from '@/lib/response-mapper';
import { Project } from '@/models/project';
import { NextRequest } from 'next/server';

export async function GET(
    _: NextRequest,
    { params }: { params: Promise<{ projectId: string }> }
) {
    await connectDB();
    try {
        const { projectId } = await params;
        const project = await Project.findById(projectId).select('price');
        if (!project) return notFound('Project not found');
        return success({ rate: project.price });
    } catch (error: any) {
        return internalServerError(error.message);
    }
}
