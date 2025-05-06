import { log } from "console";
import advModel from "../models/advModel.js";
import userModel from "../models/userModel.js";
import fs from "fs";

const addAdv = async (req, res) => {
  // Store uploaded file name in this variable
  let image_filename = `${req.file.filename}`;

  const adv = new advModel({
    
    description: req.body.description,
    category: req.body.category,
    image: image_filename,
    requiredPoints: req.body.requiredPoints, 
  });
  try {
    await adv.save();
    res.json({
      success: true,
      message: "adverticement Added",
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error" });
  }
};
//all adv list
const listAdv = async (req, res) => {
  try {
    const adv = await advModel.find({});
    res.json({ success: true, data: adv });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//remove adv item
const removeAdv = async (req, res) => {
  try {
    const adv = await advModel.findById(req.body.id);
    fs.unlink(`uploads/${adv.image}`, () => {}); //delete from folder

    await advModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Adverticement Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
const updateAdv = async (req, res) => {
  try {
    const { id, description, category } = req.body;
    const updatedFields = { description, category };

    if (req.file) {
      const adv = await advModel.findById(id);
      if (adv && adv.image) {
        fs.unlink(`uploads/${adv.image}`, (err) => {
          if (err) console.error("Error deleting old image:", err);
        });
      }
      updatedFields.image = req.file.filename; // update with new image file
    }

    await advModel.findByIdAndUpdate(id, updatedFields, { new: true });
    res.json({ success: true, message: "Advertisement Updated" });
  } catch (error) {
    console.log("Error in updateAdv:", error);
    res.json({ success: false, message: "Error updating advertisement" });
  }
};

const fetchedUsers = {};
const listAdvByUserPoints = async (req, res) => {
  try {
    const userId = req.body.userId;
    // if (fetchedUsers[userId]) {
    //   return res.status(429).json({ success: false, message: "Request already processed." });
    // }
    // fetchedUsers[userId] = true;


    const user = await userModel.findById(userId).select("points");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const adv = await advModel.find({ requiredPoints: { $lte: user.points } }).distinct('_id');

    res.json({ success: true, data: adv });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching advertisements" });
  }
};

export { addAdv, listAdv, removeAdv, updateAdv, listAdvByUserPoints };
