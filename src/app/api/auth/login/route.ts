// This route is now deprecated - use NextAuth.js instead
// The actual login is handled by NextAuth.js at /api/auth/[...nextauth]
import { NextRequest, NextResponse } from "next/server";
import { compare, hash } from "bcrypt";

export async function POST(request: NextRequest) {
    try {
    const requestBody = await request.json();
    console.log("Request method:", request.method);
        console.log("Request body:", requestBody);
        const { email, password } = requestBody;

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required" },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { message: "Please provide a valid email address" },
                { status: 400 }
            );
        }

        // Mock user lookup (replace with actual database query)
        const mockUser = {
            id: "123",
            email: "test@example.com",
            password: await hash("Password@123", 10), // Hashing the password for comparison
            name: "Test User"
        };

        // In production, replace this with actual database lookup
        if (email !== mockUser.email) {
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Verify password
        const isPasswordValid = await compare(password, mockUser.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Return success response with user data (exclude password)
        const { password: _, ...userWithoutPassword } = mockUser;
        
        return NextResponse.json(
            { 
                message: "Login successful", 
                user: userWithoutPassword,
                token: "mock-jwt-token" // In production, generate a real JWT token
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}