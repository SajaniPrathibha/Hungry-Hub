
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import staffModel from "../models/staffModel.js";

//login user
const loginStaff = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await staffModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    const token = createToken(user._id);
    res.json({ success: true, message: "successfully logged",token });
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
const registerStaff = async (req, res) => {
  const { name, password, email,address,numb,ID } = req.body;
  try {
    //checking user exist using email
    const exists = await staffModel.findOne({ email });
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

    const newUser = new staffModel({
      name: name,
      email: email,
      password: hashedPassword,
      address:address,
      numb:numb,
      ID:ID,
    });

    //save user in db
    const user = await newUser.save();
    
    const token = createToken(user._id);
    // res.json({ success: true, token });
    res.json({ success: true, message: "Registration successful!", token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
//listing user in admin pannel
const listStaff = async(req,res)=>{
  try {
    const users = await staffModel.find({})
    res.json({success:true,data:users})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"error"})
    
    
  }

}
//remove user
const removeStaff = async (req, res) => {
  try {
    const user = await staffModel.findById(req.body.id);
    // fs.unlink(`uploads/${food.image}`, () => {}); //delete from folder

    await staffModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "user Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
// update staff
const updateStaff = async (req, res) => {
  const { id, name, email, address, numb, ID } = req.body;
  try {
    const updatedStaff = await staffModel.findByIdAndUpdate(
      id,
      { name, email, address, numb, ID },
      { new: true }
    );
    if (!updatedStaff) {
      return res.json({ success: false, message: "Staff not found" });
    }
    res.json({ success: true, message: "Staff updated successfully", data: updatedStaff });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error updating staff" });
  }
};
export { loginStaff, registerStaff, listStaff, removeStaff, updateStaff };
