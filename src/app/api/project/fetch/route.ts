import { Project } from '@/models/project';
import { connectDB } from '@/lib/database';
import { success, internalServerError } from '@/lib/response-mapper';

export async function GET() {
    await connectDB();

    try {
        const rawProjects = await Project
            .find()
            .select('_id name')
            .sort({ createdAt: -1 });

        const projects = rawProjects.map((c) => ({
            id: c._id.toString(),
            name: c.name,
        }));

        return success({ projects });
    } catch (error: any) {
        return internalServerError(error.message);
    }
}
