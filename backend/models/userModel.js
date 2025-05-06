//import { type } from "@testing-library/user-event/dist/type";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address:{type:Object,required:true},
    date:{type:Date,default:Date.now()},
    number: { type: Number, required: true },
    cartData: { type: Object, default: {} },
    points: { type: Number, default: 0 },
    assignedAds: [{ type: mongoose.Schema.Types.ObjectId, ref: "adv" }],
  },
  { minimize: false }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
