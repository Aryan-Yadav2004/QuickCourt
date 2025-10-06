import express from "express";
import {createServer} from "node:http";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import v1UserRouter from "./routes/v1/userRouter.js";
import v1FacilityRouter from "./routes/v1/facilityRouter.js";
import cookieParser from "cookie-parser";
import Facility from "./models/facilityModel.js";
configDotenv();
const app = express();
const server = createServer(app);


app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//routing
//api/v1
app.use("/api/v1/user",v1UserRouter);
app.use("/api/v1/facility",v1FacilityRouter);





app.get("/",async (req,res)=>{
    console.log("hello");
    res.send("hello");
})

const start = async () => {
    const dbURL = process.env.DBurl;
    const port = process.env.PORT;
    const connecctionDB = await mongoose.connect(dbURL);
    console.log("connected to db");
    server.listen(port,()=>{
        console.log(`listening at port ${port}`);
    })
    
}
await start();
