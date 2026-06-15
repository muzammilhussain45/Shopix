import exress from "express";
import { verifyStripe,placeOrder,placeOrderStripe, allOrders, userOrders, updateStatus } from "../controllers/orderController.js";

import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = exress.Router();

// Admin Routes/features
orderRouter.post('/list',adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);


// Payment features
orderRouter.post('/place',authUser, placeOrder);
orderRouter.post('/stripe',authUser, placeOrderStripe);


// user routes/features
orderRouter.post('/userorders', authUser, userOrders);
 
// verify Payment
orderRouter.post('/verifyStripe', authUser,verifyStripe);

export default orderRouter;
