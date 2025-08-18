import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        provider: { type: String, default: "credentials" }, // Google, GitHub, credentials, etc.
        resetPasswordToken: { type: String }, // Added for password reset
        resetPasswordExpiry: { type: Date }, // Added for password reset
    },
    { timestamps: true }
);

const User = model("User", userSchema);
export default User;
