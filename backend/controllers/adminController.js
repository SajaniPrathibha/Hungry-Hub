// adminController.js
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import adminModel from "../models/adminModel.js"; // Make sure you're importing the correct admin model

// Admin login only
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await adminModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Admin doesn't exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }
        const token = createToken(user._id);
        res.json({ success: true, message: "Successfully logged in", token });
        console.log("User successfully logged in:", user.email);
        console.log(token);
          // Added for debugging
    } catch (error) {
        console.log("Error during login:", error.message);  // Enhanced error logging
        res.json({ success: false, message: "Error during login", error: error.message });
    }
};

const updatePasswordDirect = async (req, res) => {
    const { email, currentPassword, newPassword } = req.body;

    try {
        // Find the admin by email
        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin not found" });
        }

        // Check if the current password matches the stored password
        const isMatch = await bcrypt.compare(currentPassword, admin.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Current password is incorrect" });
        }

        // Hash the new password and update it
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        admin.password = hashedPassword;
        await admin.save();

        res.json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ success: false, message: "Failed to update password" });
    }
};


// Password Update for Admin
// const updatePassword = async (req, res) => {
//     const { currentPassword, newPassword } = req.body;

//     try {
//         // Extract the token from the Authorization header
//         const token = req.headers.authorization.split(" ")[1];
//         const decoded = jwt.verify(token, process.env.jwt_SECRET);
//         console.log("decoded", decoded);
        
//         const adminId = decoded.id;  // adminId is actually the user's _id from MongoDB

//         // Find the admin by _id
//         const admin = await adminModel.findById(adminId);
//         if (!admin) {
//             return res.status(404).json({ success: false, message: "Admin not found" });
//         }

//         // Check if current password is correct
//         const isMatch = await bcrypt.compare(currentPassword, admin.password);
//         if (!isMatch) {
//             return res.status(400).json({ success: false, message: "Current password is incorrect" });
//         }

//         // Hash the new password
//         const hashedPassword = await bcrypt.hash(newPassword, 10);
//         admin.password = hashedPassword;

//         // Save the new password
//         await admin.save();
//         res.json({ success: true, message: "Password updated successfully" });
//     } catch (error) {
//         console.error("Error updating password:", error);
//         res.status(500).json({ success: false, message: "Failed to update password" });
//     }
// };



// Token creation
const createToken = (id) => {
    return jwt.sign({ id }, process.env.jwt_SECRET);
};

export { loginAdmin, updatePasswordDirect };
