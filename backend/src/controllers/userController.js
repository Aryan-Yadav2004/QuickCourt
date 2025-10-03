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
    res.send("done");
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
        console.log(token);
        res.cookie("token",token).json(user);
    }
    catch(e){
        console.log(e);
    }
    
}

export {handleLogin, handleRegister};