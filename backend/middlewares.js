import jwt from "jsonwebtoken";
import Facility from "./src/models/facilityModel.js";
import User from "./src/models/userModel.js";
import Court from "./src/models/courtModel.js";
import Booking from "./src/models/bookingModel.js";
import Review from "./src/models/reviewsModel.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
dotenv.config(); // must be FIRST
//passed
const isLogedIn = (req,res,next) => {
    if(req.cookies.token){
        next();
    }
    else{
       return res.status(401).json({message: "user not loged in"});
    }
}

// passed
const ownerAuthorizationFacility = async (req,res,next) => {
    const token = req.cookies?.token;
    const {_id,role } = jwt.decode(token);
    const {facilityId} = req.params;
    const facility = await Facility.findOne({_id: facilityId});
    if(facility.owner.equals(_id)){
        next();
    }
    else{
      return  res.status(401).json({message: "you are unauthorized"});
    }
}

//passed
const ownerAuthorization = (req,res,next)=>{
    const token = req.cookies?.token;
    const {_id, role} = jwt.decode(token);
    if(role === "facilityOwner"){
        next();
    }
    else{
      return  res.status(401).json({message: "you are unauthorized"});
    }
}

//passed
const ownerAuthorizationCourt = async (req,res,next) => {
    const token = req.cookies?.token;
    const {_id,role } = jwt.decode(token);
    const {courtId} = req.params;
    const court = await Court.findOne({_id: courtId});
    const facility = await Facility.findOne({_id: court.facility_id});
    if(facility.owner.equals(_id) ){
        next();
    }
    else{
       return res.status(401).json({message: "you are unauthorized"});
    }
}

//passed
const userAuthorization = (req,res,next) => {
    const token = req.cookies?.token;
    const {_id,role } = jwt.decode(token);
    const {id} = req.params;
    if(_id === id){
        next();
    }
    else{
       return res.status(401).json({message: "you are  unauthorized"});
    }
}

//passed
const bookingAuthorization = async (req,res,next) => {
    const token = req.cookies?.token;
    const {_id,role } = jwt.decode(token);
    const {bookingId} = req.params;
    const booking = await Booking.findOne({_id: bookingId});
    if(booking.user_id.equals(_id)){
        next();
    } 
    else{
       return res.status(401).json({message: "you are booking unauthorized"});
    }   
}


//passed
const reviewAuthorization = async (req,res,next) => {
    const token = req.cookies?.token;
    const {_id,role } = jwt.decode(token);
    const {reviewId} = req.params;
    const review = await Review.findOne({_id: reviewId});
    if(review.user_id.equals(_id)){
        next();
    }
    else{
      return  res.status(401).json({message: "you are unauthorized"});
    }
}


//passed
const userCreateValidator = async (req,res,next)=>{
    const data = req.body;
    
    if(!data.name || data.name.trim()==="" || !data.email || data.email.trim()==="" || !data.username || data.username.trim()==="" || !data.password || data.password.trim()==="" || !data.street || data.street.trim()===""|| !data.city || data.city.trim()==="" || !data.state || data.state.trim()==="" || !data.country || data.country.trim()==="" || !data.phoneNo || data.phoneNo < 1000000000 || data.phoneNo > 9999999999){
      return  res.status(400).json({message: "Provide appropirate data"});
    }
    else {
        let a = await User.find({email: data.email});
        if(a.length !== 0){
           return res.status(409).json({message: "email already exits"});
        }
        a = await User.find({username: data.username});
        if(a.length !== 0){
          return  res.status(409).json({message: "username already exits"});
        }
        a = await User.find({phoneNo: data.phoneNo});
        if(a.length !== 0){
           return res.status(409).json({message: "phoneNo already exits"});
        }
    }
    next();
    
}

//passed
const userUpdateValidator = async (req,res,next) => {
    const data = req.body;
    if(!data.name || data.name.trim()===""    || !data.street || data.street.trim()===""|| !data.city || data.city.trim()==="" || !data.state || data.state.trim()===""  || !data.avtar || data.avtar.trim()===""){
       return res.status(400).json({message: "Provide appropirate data"});
    }
    next();
}
//passed
const pinCodeValidator = (pin) => {
    let flag = false;
    let a = ['0','1','2','3','4','5','6','7','8','9'];
    console.log(pin.split(''));
    pin.split('').forEach(ch => {
        if(!a.includes(ch)){
            flag = true;
        }
    });
    return flag;
}
//passed
const facilityValidator = (req,res,next) => {
    const data = req.body;
    console.log(data)
    if(!data.name || data.name.trim()==="" || !data.street || data.street.trim()===""|| !data.city || data.city.trim()==="" || !data.state || data.state.trim()==="" || !data.country || data.country.trim()==="" || !data.pinCode || data.pinCode.length !== 6 || pinCodeValidator(data.pinCode)){
       return res.status(400).json({message: "Provide Facility appropirate data"});
    }
    
    next();
}

//passed
const courtValidator = (req,res,next) => {
    const data = req.body;
    if(!data.sport || data.sport.trim()===""){
       return res.status(400).json({message: "provide appropirate data"});
    }
    next();
}
//passed
const reviewValidator = (req,res,next) => {
    const data = req.body;
    if(!data.reviewDescription || data.reviewDescription.trim()==="" || !data.rating || typeof(data.rating)==='number' || data.rating < 0 || data.rating > 5){
       return res.status(400).json({message: "provide appropirate data"});
    }
    next();
}

const slotValidator = (req,res,next) => {
    const data = req.body;
    if(!data.time || !data.totalSeats || typeof(data.totalSeat)==='number' || !data.price || typeof(data.price) !== 'number'){
       return res.status(400).json({message: "provide appropirate data"});
    }
    next();
}


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads", // optional folder name in Cloudinary
    resource_type: "raw", // allows PDFs, images, videos, etc.
  },
});

const upload = multer({ storage });
export default upload;

export { isLogedIn,slotValidator, reviewValidator, courtValidator,facilityValidator,ownerAuthorizationFacility,userUpdateValidator, userCreateValidator ,ownerAuthorizationCourt, ownerAuthorization, userAuthorization, bookingAuthorization, reviewAuthorization };