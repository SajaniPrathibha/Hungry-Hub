import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import adminModel from "./models/adminModel.js";

dotenv.config(); // Load environment variables

const createAdmin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to the database");

        // Check if an admin already exists
        const existingAdmin = await adminModel.findOne({ email: "admin2@example.com" });
        if (existingAdmin) {
            console.log("Admin already exists");
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash("admin2@123", 10);

        // Create new admin
        const admin = new adminModel({
            email: "admin2@example.com",
            password: hashedPassword,
        });
        await admin.save();
        console.log("Admin user created successfully");

    } catch (error) {
        console.error("Error creating admin:", error);
    } finally {
        mongoose.connection.close(); // Close the connection
    }
};

createAdmin();
