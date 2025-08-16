import 'dotenv/config'; // Ensure environment variables are loaded
import { connectToDB } from '@lib/mongodb';

async function testConnection() {
    console.log('🔍 Testing MongoDB connection...');
    // Check if MONGODB_URI is defined
    const MONGODB_URI = process.env.MONGODB_URI as string;
    if (!MONGODB_URI) {
        console.error('❌ MONGODB_URI is not properly configured in .env.local');
        console.log('💡 Please update your .env file with a valid MongoDB connection string');
        console.log('📋 Example for MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/skilltrackr?retryWrites=true&w=majority');
        console.log('📋 Example for local MongoDB: mongodb://localhost:27017/******');
        process.exit(1);
    }
    
    try {
        const connection = await connectToDB();
        console.log('✅ MongoDB connected successfully!');
        console.log('📊 Connection state:', connection.connection.readyState);
        
        // Optional: Test basic database operations
        const db = connection.connection.db;
        if (db) {
            const collections = await db.listCollections().toArray();
            console.log('📋 Available collections:', collections.map(c => c.name));
        }
        
        // Close connection after test
        await connection.connection.close();
        console.log('🔒 Connection closed');
        
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error);
        process.exit(1);
    }
}

// Run the test
testConnection();
