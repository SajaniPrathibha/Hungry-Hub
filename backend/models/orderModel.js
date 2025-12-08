// import { type } from "@testing-library/user-event/dist/type"
import mongoose from "mongoose"


const orderSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    items:{type:Array,required:true},
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    status: { type: String, default:"New order"},
    date:{type:Date,default:Date.now()},
    payment:{type:Boolean,default:false},
    numb: { type: Number, required: true },
    preferences: { type: Array, default: [] },
    totalCalories: { type: Array, default: [] },
    calories: [{
        foodItemId: { type: String, required: true }, // ID of the food item
        name: { type: String, required: true }, // Name of the food item
        calories: { type: Number, required: true }, // Calorie amount
    }],
    orderClosed: {
        closedBy: {
            name: { type: String },
            staffId: { type: String },
        },
        closedAt: { type: Date },
    },
})

const orderModel = mongoose.models.order || mongoose.model("order",orderSchema)
export default orderModel;