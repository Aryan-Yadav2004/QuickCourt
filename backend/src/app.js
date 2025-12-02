import express from "express";
import {createServer} from "node:http";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import v1UserRouter from "./routes/v1/userRouter.js";
import v1FacilityRouter from "./routes/v1/facilityRouter.js";
import v1SearchRouter from "./routes/v1/searchRouter.js";
import v1RazorpayRouter from "./routes/v1/razorpayRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { sendOtp } from "./auth/auth.js";
import uploadRoute from "./routes/v1/upload.js";
import cron from 'node-cron';
import { completeBooking } from "./controllers/bookingController.js";
import { createTimeSlot } from "./controllers/slotController.js";
configDotenv();
const app = express();
const server = createServer(app);
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use(cors({ 
    origin: "https://quickcourt-pvr8.onrender.com", 
    credentials: true,
}));
//https://quickcourt-online.onrender.com
app.use(cookieParser());


//routing
//api/v1
app.use("/api/v1/user",v1UserRouter);
app.use("/api/v1/facility",v1FacilityRouter);
app.use("/api/v1/search",v1SearchRouter);
app.use("/api/v1/upload",uploadRoute);
app.use('/api/v1/payment',v1RazorpayRouter); 

app.get("/api/v1/hello",(req,res)=>{
    res.json({message: "message from server"});
})

app.post("/api/v1/sendOtp",(req,res) => {
    const {otp,phonecode,phoneNo} = req.body;
    console.log(req.body);
    sendOtp(otp,phonecode,phoneNo);
    return res.status(200).json({message: "otp send from server"});
});


app.get("/",async (req,res)=>{
    console.log("hello");
    res.send("hello");
})

cron.schedule("*/1 * * * *", completeBooking);
cron.schedule("0 0 * * *",createTimeSlot,{timezone: "Asia/Kolkata"});
const start = async () => {
    const dbURL = process.env.DBurl;
    const port = process.env.PORT || 3000;
    const connectionDB = await mongoose.connect(dbURL);
    console.log("connected to db");
    server.listen(port,()=>{
        console.log(`listening at port ${port}`);
    })
    
}

await start();
