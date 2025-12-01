import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import twilio from "twilio"
const accountSid = 'AC863233b16e0b728f478e989de69ea856';
const authToken = "505a7554c04d1961d1beca7e841189f8";

const client = new twilio(accountSid, authToken);

const handleRegister = async (req, res) => {
    const myPlaintextPassword = req.body.password;
    console.log(req.body)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(myPlaintextPassword, saltRounds);
    req.body.password = hashedPassword;
    const user = new User(req.body);
    user.joinedAt = new Date();
    const result = await user.save();
    console.log(result);
    res.status(200).json({message: "User registerd successfully"});
}

const handleLogin = async (req,res) => {
    try{
        const {username,password} = req.body;
        const user = await User.findOne({username:username});
        if(!user){
            return res.status(500).json({message: "user not found"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(500).json({message: "incorrect password"});
        }
        const secretKey = process.env.JWTsecretKey;
        const token = jwt.sign({_id: user._id, username: user.username, role: user.role}, secretKey, {expiresIn: "168h"});
        return res.cookie("token",token,{httpOnly: true, secure: false, sameSite: "None", maxAge: 24 * 60 * 60 * 1000}).status(200).json(user);
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }
}

const handleLogOut = async (req,res) => {
    try {
        res.clearCookie("token",{httpOnly: true, sameSite: "strict"}).status(200).json({message: "logout successfull!"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const verifyUser = async (req,res) => {
    const token = req.cookies.token;
    if(!token){
       return res.status(401).json({message: "Not LogedIn"});
    }
    try {
        const decode = jwt.verify(token,process.env.JWTsecretKey);
        const user = await User.findOne({_id:decode._id})
        return res.status(200).json(user);
    } catch (error) {
        return res.status(403).json({message: "invalid Tokken"});
    }
} 





const sendOtp = (otp,phonecode,phoneNo) => {
    client.messages.create({
            body: `Your otp for verification is ${otp}. Thank you!`,
            from: '+12183575341',
            to: `+${phonecode}${phoneNo}`
    }).then(message => console.log(message.sid));
}


export {handleLogin, handleRegister, handleLogOut, verifyUser,sendOtp};