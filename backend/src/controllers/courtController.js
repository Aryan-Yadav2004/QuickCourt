import { populate } from "dotenv";
import Court from "../models/courtModel.js";
import Facility from "../models/facilityModel.js";
import Slot from "../models/timeSlotModel.js";
import Review from "../models/reviewsModel.js";
let createCourt = async (req,res) => {
    try {
        let { facilityId } = req.params;
        const facility = await Facility.findOne({_id: facilityId});
        const courtData = req.body;
        const court = new Court({
            about: courtData.about,
            photoLink: courtData.photoLink,
            sport: courtData.sport,
            facility_id: facility._id, 
            price: courtData.price,
            schedule: {
                days: courtData.schedule.days,
                time: courtData.schedule.time,
            }
        });
        const courtObj = await court.save();
        
        facility.courts.push(courtObj._id);
        facility.sports.push(courtData.sport);
        await facility.save();
        res.status(200).json({message: "court created"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateCourt = async(req, res) => {
    try {
        const { courtId } = req.params;
        const court = await Court.findOne({_id: courtId});

        const newCourtData = req.body;
        court.sport = newCourtData.sport;
        court.photoLink = newCourtData.photoLink;
        court.about = newCourtData.about;
        court.schedule.days = newCourtData.schedule.days;
        court.schedule.time = newCourtData.schedule.time;
        await court.save();
        res.status(200).json({message: "updated court"})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteCourt = async (req,res) => {
    try {
        const { courtId } = req.params;
        const court = await Court.findOne({_id: courtId});
        for(let slots of court.timeSlotBookingInfo){
            await Slot.deleteMany({_id: {$in: slots}});
        }
        const facility = await Facility.findOne({_id: court.facility_id});
        facility.courts = facility.courts.filter(id => !id.equals(court._id));
        await facility.save();
        await Review.deleteMany({court_id: court._id});
        await Court.deleteMany({_id: courtId});
        res.status(200).json({message: "Court deleted sucessfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const readCourt = async (req,res) => {
    try {
        const { courtId } = req.params;
        const court = await Court.findOne({_id: courtId}).populate({path: 'reviews', populate: {path: 'user_id', select: "username avtar"}});
        const facility = await Facility.findOne({_id: court.facility_id});

        res.status(200).json({...court, location: `${facility.street} ${facility.city} ${facility.state} ${facility.country}`, name: facility.name, owner_id: facility.owner});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export  { createCourt, updateCourt, deleteCourt, readCourt};