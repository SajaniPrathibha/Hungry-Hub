import orderModel from "../models/orderModel.js";

// Fetch total calorie data for user orders
export const fetchCalorieData = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        const totalCalories = orders.reduce((sum, order) => sum + (order.totalCalories || 0), 0);
        res.json({ success: true, totalCalories });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching calorie data" });
    }
};
