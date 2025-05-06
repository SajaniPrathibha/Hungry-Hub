import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import orderRouter from "./routes/orderRoute.js"
import advRouter from "./routes/advRoute.js";
import { exec } from "child_process"
import { log } from "console"
import { fileURLToPath } from "url";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import staffRouter from "./routes/staffRoute.js";
import forecastRouter from "./routes/forecastRoute.js";
import calorieRouter from "./routes/calorieRoute.js";
import preferenceRouter from "./routes/preferenceRoute.js";
import calBurnRouter from "./routes/calBurnRoute.js";
import adminRouter from "./routes/adminRoute.js";



// Manually create __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//app config
const app = express();
const port = 4000;

//middleware
app.use(express.json());
app.use(cors());

//db connection
connectDB();

//api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter)
app.use("/api/adv", advRouter);
app.use("/api/staff", staffRouter);
app.use("/api/forecast",forecastRouter)
app.use("/api/calories", calorieRouter)
app.use("/api/preferences", preferenceRouter)
app.use("/api/calburn", calBurnRouter);
app.use("/api/admin",adminRouter)


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

//get dat from server
app.get("/", (req, res) => {
  res.send("API working");
});



app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});


//mongodb+srv://smsprathibha:11223344@cluster0.zwkkldu.mongodb.net/?
