import User from "../models/userModel.js";
import Slot from "../models/timeSlotModel.js";
import Court from "../models/courtModel.js";
import Facility from "../models/facilityModel.js";
import Booking from "../models/bookingModel.js";
import jwt from "jsonwebtoken";

const createBooking = async (req,res) => {
    try {
        const { seats } = req.body;
        const token = req.cookies?.token;
        const {_id, username, role} = jwt.decode(token);
        const { slotId } = req.params;
        const slot = await Slot.findOne({_id: slotId});
        const court = await Court.findOne({_id: slot.court_id});
        const facility = await Facility.findOne({_id: court.facility_id});
        const user = await User.findOne({_id: _id});
        const bookingModel = new Booking({
            user_id: _id,
            slot_id: slot._id,
            court: court.sport,
            facility: facility.name,
            street: facility.street,
            city: facility.city,
            state: facility.state,
            country: facility.country,
            time: slot.time,
            price: slot.price,
            seats: seats,
            status : "booked"
        });
        const booking = await bookingModel.save();
        
        slot.bookings.push(booking._id);
        user.bookings.push(booking._id);
        await slot.save();
        await user.save();
        res.status(200).json({bookingId :  booking._id});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getBooking = async(req,res)=>{
    try{
        const { bookingId } = req.params;
        const booking = await Booking.findOne({_id: bookingId});
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({message: error.message});
    }        
}

const cancelBooking = async(req,res) => {
    try{
        const { bookingId } = req.params;
        const booking = await Booking.findOne({_id: bookingId});
        const slot = await Slot.findOne({_id: booking.slot_id}); 
        slot.bookings = slot.bookings.filter(currBookingId => !currBookingId.equals(booking._id));
        await slot.save();
        booking.status = "cancelled";
        await booking.save();
        res.status(200).json({message: "cancelled ticket"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }   
        
}

const completeBooking = async(req,res)=>{
    try{
        const { bookingId } = req.params;
        const booking = await Booking.findOne({_id: bookingId});
        booking.status = "completed";
        await booking.save();
        res.status(200).json({message: "completed ticket"});
    } catch(error) {
        res.status(500).json({message: error.message});
    }
    
}


export { createBooking , getBooking, cancelBooking, completeBooking};