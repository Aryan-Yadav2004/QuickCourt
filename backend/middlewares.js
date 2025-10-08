import jwt from "jsonwebtoken";
import Facility from "./src/models/facilityModel.js";
import User from "./src/models/userModel.js";
import Court from "./src/models/courtModel.js";
import Booking from "./src/models/bookingModel.js";
import Review from "./src/models/reviewsModel.js";
//passed
const isLogedIn = (req,res,next) => {
    if(req.cookies.token){
        next();
    }
    else{
        res.status(401).json({message: "user not loged in"});
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
        res.status(401).json({message: "you are unauthorized"});
    }
}

//passed
const ownerAuthorization = (req,res,next)=>{
    const token = req.cookies?.token;
    const {_id,role } = jwt.decode(token);
    if(role === "facilityOwner"){
        next();
    }
    else{
        res.status(401).json({message: "you are unauthorized"});
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
        res.status(401).json({message: "you are unauthorized"});
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
        res.status(401).json({message: "you are unauthorized"});
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
        res.status(401).json({message: "you are booking unauthorized"});
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
        res.status(401).json({message: "you are unauthorized"});
    }
}


//passed
const userCreateValidator = async (req,res,next)=>{
    const data = req.body;
    
    if(!data.name || data.name.trim()==="" || !data.email || data.email.trim()==="" || !data.username || data.username.trim()==="" || !data.password || data.password.trim()==="" || !data.street || data.street.trim()===""|| !data.city || data.city.trim()==="" || !data.state || data.state.trim()==="" || !data.country || data.country.trim()==="" || !data.phoneNo || data.phoneNo < 1000000000 || data.phoneNo > 9999999999){
        res.status(400).json({message: "Provide appropirate data"});
    }
    else {
        let a = await User.find({email: data.email});
        if(a.length !== 0){
            res.status(409).json({message: "email already exits"});
        }
        a = await User.find({username: data.username});
        if(a.length !== 0){
            res.status(409).json({message: "username already exits"});
        }
        a = await User.find({phoneNo: data.phoneNo});
        if(a.length !== 0){
            res.status(409).json({message: "phoneNo already exits"});
        }
    }
    next();
    
}

//passed
const userUpdateValidator = async (req,res,next) => {
    const data = req.body;
    
    if(!data.name || data.name.trim()===""  || !data.username || data.username.trim()===""  || !data.street || data.street.trim()===""|| !data.city || data.city.trim()==="" || !data.state || data.state.trim()==="" || !data.country || data.country.trim()==="" || !data.phoneNo || data.phoneNo < 1000000000 || data.phoneNo > 9999999999 || !data.avatar || data.avatar.trim()===""){
        res.status(400).json({message: "Provide appropirate data"});
    }
    else {
        const token = req.cookies?.token;
        const {_id,role } = jwt.decode(token);
        let a = await User.find({email: data.email});
        if(a.length !== 0 && !a[0]._id.equals(_id)){
            res.status(409).json({message: "email already exits"});
        }
        a = await User.find({username: data.username});
        if(a.length !== 0 && !a[0]._id.equals(_id)){
            res.status(409).json({message: "username already exits"});
        }
        a = await User.find({phoneNo: data.phoneNo});
        if(a.length !== 0 && !a[0]._id.equals(_id)){
            res.status(409).json({message: "phoneNo already exits"});
        }
    }
    next();
}




export { isLogedIn, ownerAuthorizationFacility,userUpdateValidator, userCreateValidator ,ownerAuthorizationCourt, ownerAuthorization, userAuthorization, bookingAuthorization, reviewAuthorization };