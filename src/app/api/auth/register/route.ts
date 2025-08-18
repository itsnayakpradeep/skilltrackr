import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function POST(request: NextRequest) {
    try {
        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "Name, email, and password are required" },
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

        // Validate password strength
        if (password.length < 8) {
            return NextResponse.json(
                { message: "Password must be at least 8 characters long" },
                { status: 400 }
            );
        }

        // Hash the password
        const hashedPassword = await hash(password, 10);

        // Here you would typically save the user to your database
        // For now, we'll just return a success response
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            createdAt: new Date().toISOString()
        };

        return NextResponse.json(
            { message: "User registered successfully", user: newUser },
            { status: 201 }
        );

    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
