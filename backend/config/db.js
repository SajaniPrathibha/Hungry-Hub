import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://smsprathibha:11223344@cluster0.zwkkldu.mongodb.net/fooddel"
    );
    console.log("DB Connected");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};
