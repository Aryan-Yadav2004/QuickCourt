import express from "express";
import { createFundAccount, createOrder, verifyPayment } from "../../controllers/razorpayController.js";
import { isLogedIn } from "../../../middlewares.js";
const router = express.Router();

router.post('/orders', isLogedIn, createOrder);
router.post('/verify',isLogedIn,verifyPayment);
router.post('/createFundAccount',createFundAccount); 
export default router;