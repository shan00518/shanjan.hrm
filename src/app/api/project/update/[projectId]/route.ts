
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/database';
import { Project, ProjectStatus } from '@/models/project';
import {
    success,
    notFound,
    badRequest,
    internalServerError,
} from '@/lib/response-mapper';
import { Types } from 'mongoose';

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ projectId: string }> }
) {
    try {
        await connectDB();

        const body = await req.json();

        const { client, name, description, price, startDate, endDate, status, employees } = body;

        const updates: Record<string, any> = {};

        if (client) updates.client = new Types.ObjectId(client);
        if (name) updates.name = name;
        if (description) updates.description = description;
        if (price !== undefined) updates.price = price;
        if (startDate) updates.startDate = new Date(startDate);
        if (endDate) updates.endDate = new Date(endDate);

        if (status) {
            const validStatuses: ProjectStatus[] = ['pending', 'in_progress', 'completed'];
            if (!validStatuses.includes(status)) {
                return badRequest('Invalid status. Use pending, in_progress, or completed.');
            }
            updates.status = status;
        }

        if (Array.isArray(employees)) {
            updates.employees = employees.map((id: string) => new Types.ObjectId(id));
        }

        const { projectId } = await params;
        const project = await Project.findById(projectId);
        if (!project) return notFound('Project not found');

        const updatedProject = await Project.findByIdAndUpdate(projectId, updates, {
            new: true,
        });

        return success({ project: updatedProject }, 'Project updated successfully');
    } catch (error: any) {
        console.error('Project update error:', error);
        return internalServerError('An error occurred while updating the project');
    }
}
