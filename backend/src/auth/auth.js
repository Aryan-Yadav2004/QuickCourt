import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const handleRegister = async (req, res) => {
    const myPlaintextPassword = req.body.password;
    console.log(req.body)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(myPlaintextPassword, saltRounds);
    req.body.password = hashedPassword;
    const user = new User(req.body);
    const result = await user.save();
    console.log(result);
    res.status(200).json({message: "User registerd successfully"});
}

const handleLogin = async (req,res) => {
    try{
        const {username} = req.body;
        const user = await User.findOne({username:username});
        if(!user){
            throw "No user found";
        }
        const secretKey = process.env.JWTsecretKey;
        const token = jwt.sign({_id: user._id, username: user.username, role: user.role}, secretKey, {expiresIn: "168h"});
        res.cookie("token",token,{httpOnly: true, sameSite: "strict"}).status(200).json({message: "User logedIn successfully"});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

const handleLogOut = async (req,res) => {
    try {
        res.clearCookie("token",{httpOnly: true, sameSite: "strict"}).status(200).json({message: "logout successfull!"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const verifyUser = (req,res) => {
    const token = req.cookies.token;
    if(!token){
        res.status(401).json({message: "Not LogedIn"});
    }
    try {
        const decode = jwt.verify(token,process.env.JWTsecretKey);
        return res.status(200).json({message: "LogedIn"});
    } catch (error) {
        return res.status(403).json({message: "invalid Tokken"});
    }
} 

export {handleLogin, handleRegister, handleLogOut, verifyUser};