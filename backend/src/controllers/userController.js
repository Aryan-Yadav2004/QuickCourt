import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const handleRegister = async (req, res) => {
    const myPlaintextPassword = req.body.password;
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

const updateUser = async (req,res) => {
    try {
        const { id } = req.params;
        const newUser = req.body;
        const user = await User.findOne({_id: id});
        user.name = newUser.name;
        user.username = newUser.username;
        user.street = newUser.street;
        user.district = newUser.district;
        user.state = newUser.state;
        user.country = newUser.country;
        user.avtar = newUser.avtar;
        user.phoneNo = newUser.phoneNo;
        await user.save();
        res.status(200).json({message: "User updated"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getUser = async(req,res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({_id: id});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getAllBookings = async(req,res) => {
    try{
        const { id } = req.params;
        const user = await User.findOne({_id: id}).populate("bookings");
        res.status(500).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }    
}

export {handleLogin, handleRegister, handleLogOut , updateUser, getUser, getAllBookings};