import { Client } from '@/models/client';
import { connectDB } from '@/lib/database';
import { success, internalServerError } from '@/lib/response-mapper';

export async function GET() {
  await connectDB();

  try {
    const rawClients = await Client
      .find()
      .select('_id name')
      .sort({ createdAt: -1 });

    const clients = rawClients.map((c) => ({
      id: c._id.toString(),
      name: c.name,
    }));

    return success({ clients });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return internalServerError(error.message);
    }
    return internalServerError('An unknown error occurred');
  }
}
