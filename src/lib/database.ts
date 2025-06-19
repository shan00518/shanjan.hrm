import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('❌ Please define the MONGODB_URI environment variable');
}

export const connectDB = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState === 1) {
      return; // Already connected
    }

    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown MongoDB connection error';
    console.error('❌ MongoDB connection error:', message);
    process.exit(1);
  }
};
