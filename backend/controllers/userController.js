import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//token creation
const createToken = (id) => {
  return jwt.sign({ id }, process.env.jwt_SECRET);
};

//register user
const registerUser = async (req, res) => {
  const { name, password, email,address,number } = req.body;
  try {
    //checking user exist using email
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    //validating email  format and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email" });
    }

    //password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter validate password",
      });
    }

    //hasing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
      address: address,
      number:number,
    });

    //save user in db
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
//listing user in admin pannel
const listUsers = async(req,res)=>{
  try {
    const users = await userModel.find({})
    res.json({success:true,data:users})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"error"})
    
    
  }

}
//remove user
const removeUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.id);
    // fs.unlink(`uploads/${food.image}`, () => {}); //delete from folder

    await userModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "user Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
// Add points to user account
const addPoints = async (req, res) => {
  const { userId, points } = req.body;
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Assuming points are to be stored in the user model
    const updatedPoints = (user.points || 0) + points;
    user.points = updatedPoints;
    await user.save();

    res.json({ success: true, message: "Points added successfully", points: updatedPoints });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error adding points" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    // Access userId from req.body which is set by authMiddleware
    const userId = req.body.userId;

    // Retrieve user details, excluding sensitive data like password
    const user = await userModel.findById(userId, { password: 0 });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Return user data
    res.json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching user profile" });
  }
};

const changePassword = async (req, res) => {
  const { email, number, newPassword } = req.body;

  try {
    const user = await userModel.findOne({ email, number });
    if (!user) {
      return res.json({ success: false, message: "User not found or invalid details" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error updating password" });
  }
};
const updateUserProfile = async (req, res) => {
  const userId = req.body.userId; // Assumes `authMiddleware` attaches user ID to `req.user`
  const { name, address, number } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Update user fields
    user.name = name || user.name;
    user.address = address || user.address;
    user.number = number || user.number;

    await user.save();

    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error updating profile" });
  }
};
export { loginUser, registerUser, listUsers, removeUser, addPoints, getUserProfile, changePassword, updateUserProfile };
