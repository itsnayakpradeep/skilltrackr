import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;
if(!MONGODB_URI) throw new Error('Please define the MONGODB_URI environment variable inside .env.local');

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    var mongoose: MongooseCache | undefined;
}

const cached = global.mongoose || { conn: null, promise: null };

export async function connectToDB() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        }).then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
