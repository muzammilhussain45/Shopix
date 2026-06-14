

// Placing orders using COD Method

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const placeOrder = async (req, res) => {
try {
    const {userId, items, amount, address} = req.body;

    const orderData = {
        userId,
        items,
        address,
        amount,
        paymentMethod: "COD",
        payment: false,
        date: Date.now()
    }

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel .findByIdAndUpdate(userId, {cartData:{}})
    res.json({success:true,messsage: "Order Placed" })    
} catch (error) {
    res.json({success:false, message: error.message})
    
}

}


// Placing orders using Stripe Method

const placeOrderStripe = async (req, res) => {

    
}

// Placing orders using RazorPay Method

const placeOrderRazorPay = async (req, res) => {

}

// All orders data for Admin panel
const allOrders = async (req, res) => {
    try {
        const order =  await orderModel.find({});
        res.json({success:true, orders})
    } catch (error) {
         res.json({success:false, message: error.message})
    }

}

// user order data for user panel
const userOrders = async (req, res) => {
    try {
        const {userId} = req.body;
        const orders = await orderModel.find({userId});
        res.json({success:true, orders})
        
    } catch (error) {
        res.json({success:false, message: error.message})
    }
    
}

// update order status from admin panel
const updateStatus = async (req, res) => {
        try {
            const {orderId, status} = req.body;
            await orderModel.findByIdAndUpdate(orderId, {status})
            res.json({success:true, message:"Status Updated"})
        } catch (error) {

            res.json({success:false, message: error.message})
        }
}


export { placeOrder,placeOrderStripe, placeOrderRazorPay, allOrders, userOrders, updateStatus }

