import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


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

export {updateUser, getUser, getAllBookings};