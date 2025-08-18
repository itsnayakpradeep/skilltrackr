const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

// User schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    provider: { type: String, default: "credentials" },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

async function seedMockUser() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB successfully');

        // Create mock user
        const hashedPassword = await bcrypt.hash('Password@123', 10);
        
        const mockUser = {
            name: 'Test User',
            email: 'test@example.com',
            password: hashedPassword,
            provider: 'credentials'
        };

        // Delete existing user if exists
        await User.deleteOne({ email: 'test@example.com' });
        
        // Create new user
        const user = new User(mockUser);
        await user.save();
        
        console.log('✅ Mock user created successfully!');
        console.log('Email: test@example.com');
        console.log('Password: Password@123');
        
    } catch (error) {
        console.error('❌ Error creating mock user:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

seedMockUser();
