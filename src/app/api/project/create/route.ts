/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/database';
import {
    success,
    badRequest,
    internalServerError,
} from '@/lib/response-mapper';
import { Project, IProject, ProjectStatus } from '@/models/project';
import { Types } from 'mongoose';

export async function POST(req: NextRequest) {
    await connectDB();

    try {
        const body = await req.json();

        const { client, name, startDate, status, description, price, endDate, employees } = body;

        if (!client || !name || !startDate) {
            return badRequest('client, name, and startDate are required');
        }

        const validStatus: ProjectStatus[] = ['pending', 'in_progress', 'completed'];
        const projectStatus: ProjectStatus = validStatus.includes(status) ? status : 'pending';

        const payload: Partial<IProject> = {
            client: new Types.ObjectId(client),
            name,
            description: description || '',
            price: price || 0,
            startDate: new Date(startDate),
            endDate: endDate ? new Date(endDate) : undefined,
            status: projectStatus,
            employees: Array.isArray(employees)
                ? employees.map((id: string) => new Types.ObjectId(id))
                : [],
        };

        const newProject = await Project.create(payload);
        return success({ project: newProject }, 'Project created successfully');
    } catch (err: any) {
        return internalServerError(err.message);
    }
}