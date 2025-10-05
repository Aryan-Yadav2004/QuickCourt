import mongoose from "mongoose";
const Schema = new mongoose.Schema({
    sport: {
        type: String,
        required: true,
    },
    amenities: [
        {
            type: String,
        }
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
        }
    ],
    photoLink : {
        type: String,
    },
    timeSlotBookingInfo: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Slot"
        }
    ],
    about:{
        type: String,
    },
    facility_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Facility"
    }
});

const Court = mongoose.model("Court",Schema);
export default Court;