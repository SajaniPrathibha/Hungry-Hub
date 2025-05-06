import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"
import dotenv from 'dotenv';
import staffModel from "../models/staffModel.js"
import jwt from "jsonwebtoken"
dotenv.config();


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


//placing user order for frontend
const placeOrder = async(req,res) =>{
    const frontend_url = "http://localhost:5174"

    try {
        console.log("Request body:", req.body);


        const calorieData = req.body.items.map(item => ({
            foodItemId: item._id, // Assuming item._id is the ID of the food item
            name: item.name,
            calories: item.calories || 0, // Assuming you pass calories in the item
        }));

        console.log("Calories Data:", calorieData);
        const totalCalories = calorieData.reduce((sum, item) => sum + item.calories, 0);
        console.log("Total Calories:", totalCalories);
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            calories: calorieData,
            amount:req.body.amount,
            address:req.body.address,
            numb:req.body.numb,
            preferences: req.body.preferences || [],
            totalCalories,
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})
        
        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"inr", 
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:20000
            },
            quantity:1
        })
        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({success:true,session_url:session.url})
        //  res.json({ success: true, message: "Order placed without payment" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message || "Unknown error" });
        
    }
}
const verifyOrder = async(req,res) =>{
    const {orderId,success} = req.body;
    console.log("success");
    console.log("hey"); 
    try {
        if (success==="true") {
            
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            res.json({success:true,message:"Paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false,message:"not paid"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})

        
    }

}

//user order for frontend
const userOrders = async(req,res) =>{
    try {
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

// Listing orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find().populate("orderClosed.closedBy");
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error fetching orders" });
    }
};
// api for updating order status
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        const token = req.headers.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user is staff
        const staff = await staffModel.findById(decoded.id);

        let closedBy = {
            name: "Admin", // Default to admin
            staffId: null, // No staff ID for admin
        };

        if (staff) {
            // If the user is staff, update the closedBy object
            closedBy = {
                name: staff.name,
                staffId: staff.staffId,
            };
        }

        if (status === "Order is closed") {
            const orderClosedInfo = {
                closedBy,
                closedAt: new Date(), // Record the current date and time
            };

            const updatedOrder = await orderModel.findByIdAndUpdate(
                orderId,
                { status, orderClosed: orderClosedInfo },
                { new: true }
            );

            return res.json({ success: true, message: "Status updated", data: updatedOrder });
        }

        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        res.json({ success: true, message: "Status updated", data: updatedOrder });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error updating status" });
    }
};


export {placeOrder , verifyOrder,userOrders,listOrders,updateStatus}