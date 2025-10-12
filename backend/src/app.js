import express from "express";
import {createServer} from "node:http";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import v1UserRouter from "./routes/v1/userRouter.js";
import v1FacilityRouter from "./routes/v1/facilityRouter.js";
import v1SearchRouter from "./routes/v1/searchRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";
configDotenv();
const app = express();
const server = createServer(app);

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//routing
//api/v1
app.use("/api/v1/user",v1UserRouter);
app.use("/api/v1/facility",v1FacilityRouter);
app.use("/api/v1/search",v1SearchRouter);


app.get("/api/v1/hello",(req,res)=>{
    res.json({message: "message from server"});
})


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
