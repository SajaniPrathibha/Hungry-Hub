// import { type } from "@testing-library/user-event/dist/type";
import mongoose from "mongoose";

const advSchema = new mongoose.Schema({
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  requiredPoints: { type: Number, required: true, default: 0 }
});

const advModel = mongoose.models.adv || mongoose.model("adv", advSchema);

export default advModel;
