import jwt from "jsonwebtoken";
import Facility from "../models/facilityModel.js";
import Court from "../models/courtModel.js";
import User from "../models/userModel.js";
import Slot from "../models/timeSlotModel.js";
import Review from "../models/reviewsModel.js";
const createFacility = async (req,res) => {
    try {
        const token = req.cookies?.token;
        const data = jwt.decode(token);
        req.body.owner = data._id;
        const facility = new Facility(req.body);
        const owner = await User.findOne({_id: data._id});
        const result = await facility.save();
        owner.facility.push(facility._id);
        await owner.save();
        res.status(200).json({message: "facility created"});
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteFacility = async (req,res) => {
    try {
        const { facilityId } = req.params;
        const facility = await Facility.findOne({_id: facilityId});
        const courts = await Court.find({_id: {$in: facility.courts}});
        for(let court of courts){
            for(let slots of court.timeSlotBookingInfo){
                await Slot.deleteMany({_id: {$in: slots}});
            }
            await Review.deleteMany({court_id: court});
        }
        await Court.deleteMany({_id: {$in: facility.courts}});
        
        const token = req.cookies?.token;
        const data = jwt.decode(token);
        const owner = await User.findOne({_id: data._id});
        owner.facility = owner.facility.filter(fId => !fId.equals(facility._id));
        await owner.save();
        await Facility.deleteOne({_id: facilityId});
        res.status(200).json({message: "facility deleted successfully."});
    } catch (error) {
        res.status(500).json({message: "failed to delete."});
    }
}

const updateFacility = async(req,res) => {
    // name, street, state, district, country, pincode, profileImg, photos , about
    try {
        const { facilityId } = req.params;
        const facility = await Facility.findOne({_id: facilityId});
        const newFacility = req.body;
        facility.name = newFacility.name;
        facility.profileImg = newFacility.profileImg; 
        facility.about = newFacility.about;
        facility.photos = newFacility.photos;
        facility.amenities = newFacility.amenities;
        await facility.save();
        res.status(200).json({message: "Facility Updated!"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

let readFacility = async (req,res) => {
    try {
        let { facilityId } = req.params; 
        const facility = await Facility.findOne({_id: facilityId}).populate("courts").populate('owner');
        res.status(200).json(facility);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

let readAllOwnerFacility = async (req,res) => {
    try {
        const token = req.cookies?.token;
        const data = jwt.decode(token);
        const owner = await User.findOne({_id: data._id}); 
        let facilities = [];
        for(let facilityId of owner.facility) {
            let facility = await Facility.findOne({_id: facilityId}).populate("courts");
            facilities.push(facility);
        }
        res.status(200).json(facilities);
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
}



// admin api
const allPendingRequest = async (req,res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const total = await Facility.countDocuments({status: "pending"});
        const pendingFacilities = await Facility.find({status: "pending"}).skip(skip).limit(limit).populate("owner");
        res.status(200).json({facilities: pendingFacilities, total: total}); 
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const replyRequest = async (req,res) => {
    try {
        const {facilityId} = req.params;
        const {request} = req.body;
        await Facility.updateOne({_id: facilityId},{$set: {status: request}});
        res.status(200).json({message: "request sent"});
    }
    catch (error){
        res.status(500).json({message: error.message});
    }
}


export {createFacility, deleteFacility, updateFacility, readFacility, readAllOwnerFacility,allPendingRequest, replyRequest};