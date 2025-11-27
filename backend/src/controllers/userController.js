import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Facility from "../models/facilityModel.js";
import Court from "../models/courtModel.js";
import Slot from "../models/timeSlotModel.js";
import Booking from "../models/bookingModel.js";


const updateUser = async (req,res) => {
    try {
        const { id } = req.params;
        const newUser = req.body;
        const user = await User.findOne({_id: id});
        user.name = newUser.name;
        user.street = newUser.street;
        user.city = newUser.city;
        user.state = newUser.state;
        user.avtar = newUser.avtar;
        await user.save();
        res.status(200).json({message: "User updated"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getUser = async(req,res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({_id: id}).populate('facility').populate('bookings');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getAllBookings = async(req,res) => {
    try{
        const { id } = req.params;
        const user = await User.findOne({_id: id}).populate("bookings");
        res.status(200).json(user.bookings);
    } catch (error) {
        res.status(500).json({message: error.message});
    }    
}

const getAllUser = async (req,res) => {
    try{
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const users = await User.find({}).skip(skip).limit(limit);
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
}

const updateUserStatus = async (req,res) => {
    try{
        const {id} = req.params;
        const {status} = req.body;
        await User.updateOne({_id: id},{$set:{status:status}})
        res.status(200).json({message: "updated status"})
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getUserByUsername = async(req,res) => {
    try {
        const username = req.query.username;
        console.log(username);
        const user = await User.findOne({username: username}).populate('facility').populate('bookings');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

function parseDate(time){
    const [yyyy,mm,dd] = time.split('-');
    const start = new Date(yyyy, mm - 1, dd, 0, 0, 0);
    const end = new Date(yyyy, mm - 1, dd, 23, 59, 59);
    return {start, end};
}

const getFacilityBookingDetails = async(req,res) => {
    try{
        const {id, time} = req.params;
        console.log(id,time);
        const user = await User.findOne({_id: id});
        const facilities = await Facility.find({owner: user._id});
        const {start, end} = parseDate(time);
        let result = [];
        for(let facility of facilities){
            for(let cId of facility.courts){
                const court = await Court.findOne({_id: cId});
                const slots = await Slot.find({court_id: court._id, time: {$gte: start, $lte: end}});
                for(let slot of slots){
                    result.push({facility: facility.name, court: court.sport, time: slot.time, seats: slot.totalSeatsBooked, amount: (slot.price * slot.totalSeatsBooked)});
                }
            }
        }
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
}

const BookingChartData = async () => {
    let sports = {
        "soccer": 0,
        "cricket": 0,
        "basketball": 0,
        "tennis": 0,
        "volleyball": 0,
        "rugby": 0,
        "hockey": 0,
        "baseball": 0,
        "table tennis": 0,
        "badminton": 0,
        "athletics": 0,
        "swimming": 0,
        "boxing": 0,
        "wrestling": 0,
        "judo": 0,
        "karate": 0,
        "taekwondo": 0,
        "fencing": 0,
        "archery": 0,
        "cycling": 0,
        "golf": 0,
        "gymnastics": 0,
        "skiing": 0,
        "snowboarding": 0,
        "figure skating": 0,
        "speed skating": 0,
        "curling": 0,
        "equestrian": 0,
        "rowing": 0,
        "canoeing": 0,
        "sailing": 0,
        "shooting": 0,
        "triathlon": 0,
        "polo": 0,
        "surfing": 0,
        "skateboarding": 0,
        "climbing": 0,
        "e-sports": 0
    };
    let now = new Date();
    let mon =  now.getMonth();
    let date = now.getDate();
    let day = now.getDay();
    let week = Array(7).fill(0);
    let month = Array(31).fill(0);
    let year = Array(12).fill(0); 
    let earnWeek = Array(7).fill(0);
    let earnMonth = Array(31).fill(0);
    let earnYear = Array(12).fill(0); 
    const bookings = await Booking.find({status: "completed"});
    for(let booking of bookings){
        const time = new Date(booking.time);
        sports[booking.court] += booking.seats;
        year[time.getMonth()] += booking.seats;
        earnYear[time.getMonth()] += booking.seats * booking.price;
        if(mon === time.getMonth()){
            month[time.getDate()] += booking.seats;
            earnMonth[time.getDate()] += booking.seats * booking.price;
            if(time.getDate() <= date && date - 7 < time.getDate() ){
                earnWeek[time.getDay()] += booking.seats * booking.price;
                week[time.getDay()] += booking.seats;
            }
        }
    }
    return { bookings: {week, month, year}, sports, earning: {week: earnWeek, month: earnMonth, year: earnYear} };
}

const userRegistrationChartData = async () => {
    const users = await User.find({},"joinedAt");
    let now = new Date();
    let mon =  now.getMonth();
    let date = now.getDate();
    let day = now.getDay();
    let week = Array(7).fill(0);
    let month = Array(31).fill(0);
    let year = Array(12).fill(0); 
    for(let user of users){
        const time = new Date(user.joinedAt);
        year[time.getMonth()] += 1;
        if(mon === time.getMonth()){
            month[time.getDate()] += 1;
            if(time.getDate() <= date && date - 7 < time.getDate() ){
                week[time.getDay()] += 1;
            }
        }
    }
    return {userRegistrationChart: {week,month, year}}
}

const getAdminStats = async (req,res) => {
    try {
        const totalUser = await User.countDocuments({status: "active"});
        const totalFacilityOwner = await User.countDocuments({role: "facilityOwner", status: "active"});
        const totalBooking = await Booking.countDocuments({status: "completed"});
        const totalActiveCourts = await Court.countDocuments({});
        const booking = await BookingChartData();
        const userReg = await userRegistrationChartData();
        res.status(200).json({...booking, ...userReg, totalUser, totalFacilityOwner, totalBooking, totalActiveCourts});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export {updateUser, getAdminStats ,getUser, getAllBookings,getAllUser, updateUserStatus, getUserByUsername, getFacilityBookingDetails};