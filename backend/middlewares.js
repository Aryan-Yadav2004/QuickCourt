import jwt from "jsonwebtoken";
import Facility from "./src/models/facilityModel.js";
import User from "./src/models/userModel.js";
import Court from "./src/models/courtModel.js";
import Booking from "./src/models/bookingModel.js";
import Review from "./src/models/reviewsModel.js";

const isLogedIn = (req,res,next) => {
    if(req.cookies.token){
        next();
    }
    else{
        res.status(401).json({message: "user not loged in"});
    }
}

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

const bookingAuthorization = async (req,res,next) => {
    const token = req.cookies?.token;
    const {_id,role } = jwt.decode(token);
    const {bookingId} = req.params;
    const booking = await Booking.findOne({_id: bookingId});
    if(booking.user_id.equals(_id)){
        next();
    } 
    else{
        res.status(401).json({message: "you are unauthorized"});
    }
}

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

export { isLogedIn, ownerAuthorizationFacility, ownerAuthorizationCourt, ownerAuthorization, userAuthorization, bookingAuthorization, reviewAuthorization };