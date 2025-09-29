import express from "express";
import {createServer} from "node:http";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import User from "./models/userModel.js";

configDotenv();
const app = express();
const server = createServer(app);

const start = async () => {
    const dbURL = process.env.DBurl;
    const port = process.env.PORT;
    const connecctionDB = await mongoose.connect(dbURL);
    console.log("connected to db");
    console.log(connecctionDB.connection.host);
    server.listen(port,()=>{
        console.log(`listening at port ${port}`);
    })
}
await start();

const user = new User({
    name: "Aryan",
    email: "email@email.com",
    password: "password",
    username: "faeda",
    Street: "Torwa",
    District: "Bilaspur",
    Country: "India",
    Role: "user",
})
 const res = await user.save();
 console.log(res);

