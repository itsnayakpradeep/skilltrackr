import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@lib/mongodb';
import User from '@models/User';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
    try {
        await connectToDB();
        
        const { email } = await request.json();
        
        if (!email) {
            return NextResponse.json(
                { message: 'Email is required' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { message: 'Please provide a valid email address' },
                { status: 400 }
            );
        }

        // Find user by email
        const user = await User.findOne({ email: email.toLowerCase() });
        
        if (!user) {
            // Don't reveal if user exists or not for security
            return NextResponse.json(
                { message: 'If an account exists with this email, you will receive a password reset link' },
                { status: 200 }
            );
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

        // Save reset token and expiry to user
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiry = resetTokenExpiry;
        await user.save();

        // In a real application, you would send an email here
        // For now, we'll just return a success message
        // The reset URL would be: `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`
        
        console.log(`Password reset requested for: ${email}`);
        console.log(`Reset token: ${resetToken}`);

        return NextResponse.json(
            { 
                message: 'If an account exists with this email, you will receive a password reset link',
                // In development, include the token for testing
                ...(process.env.NODE_ENV === 'development' && { token: resetToken })
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Forgot password error:', error);
        return NextResponse.json(
            { message: 'An error occurred while processing your request' },
            { status: 500 }
        );
    }
}
