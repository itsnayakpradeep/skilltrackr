import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";

export default async function register(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });
    

    const { name, email , password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        const hashedPassword = await hash(password, 10);
        // Here you would typically save the user to your database
        // For example: await User.create({ username, password: hashedPassword });
        // Store user in DB (replace with your DB logic)
        const newUser = {id: Date.now(), name, email, password: hashedPassword}; // Mock user object
        return res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}