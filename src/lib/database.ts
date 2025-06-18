import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI environment variable');
}

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown MongoDB connection error';
    console.error('❌ MongoDB connection error:', message);
    process.exit(1);
  }
};
