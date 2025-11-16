import { populate } from "dotenv";
import Court from "../models/courtModel.js";
import Facility from "../models/facilityModel.js";
import Slot from "../models/timeSlotModel.js";
import Review from "../models/reviewsModel.js";

const months = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

const days = ["sunday","monday","tuesday","wednesday","thrusday","friday","saturday"];

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
            },
            seats: courtData.seats,
        });
        const courtObj = await court.save();
        
        facility.courts.push(courtObj._id);
        facility.sports.push(courtData.sport);
        await facility.save();
        const now = new Date();
        const day = now.toLocaleDateString("en-US",{weekday: 'long'});
        const date = now.getDate();
        console.log(date)
        const month = now.toLocaleDateString("en-US",{month: 'long'});
        const year = now.getFullYear();
        const index = days.indexOf(day);
        for(let i = 0; i < 3; i++){
            const currDay = (i + index < 7)? days[i + index]:days[i];
            if(!courtObj.schedule.days.includes(currDay)) continue;
            for(let t of courtObj.schedule.time){
                let hour24 = t.hour; 
                if(t.meridian === "PM" && t.hour < 12){
                    hour24 += t.hour;
                } 
                if(t.meridian === "AM" && t.hour === 12){
                    hour24 = 0;
                }
                const obj = new Slot({
                    time: new Date(year, months[month], (date + i), hour24, t.minute, 0),
                    price: courtObj.price,
                    court_id: courtObj._id,
                });
                console.log(date + i);
                const slot = await obj.save();
                courtObj.timeSlotBookingInfo.push(slot._id);
            }
        }   
        await courtObj.save();
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
        court.seats = newCourtData.seats;
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
        const now = new Date();
        const day = now.toLocaleDateString("en-US",{weekday: 'long'}).toLocaleLowerCase();
        const nextNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        const nextDay = nextNow.toLocaleDateString("en-US",{weekday: 'long'}).toLocaleLowerCase();
        const timeSlots = await Slot.find({court_id: court._id, time: {$gte: now}});
        const today = [];
        const tomorrow = [];
        const dayAfter = [];
        for(let t of timeSlots){
            const currTime = new Date(t.time);
            let d = days[currTime.getDay()];
            if(day === d){
                today.push(t); 
            }
            else if(nextDay === d){
                tomorrow.push(t);
            }
            else{
                dayAfter.push(t);
            }
        }
        res.status(200).json({sport: court.sport, reviews: court.reviews, rating: court.rating, photoLink: court.photoLink, price: court.price, schedule: court.schedule, about: court.about,facility_id: court.facility_id,overAllRating: court.overAllRating, totalReviews: court.totalReviews, seats: court.seats, location: `${facility.street} ${facility.city} ${facility.state} ${facility.country}`, name: facility.name, owner_id: facility.owner, timeSlots: {today: today, tomorrow: tomorrow, dayAfter: dayAfter}});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export  { createCourt, updateCourt, deleteCourt, readCourt};