import mongoose from "mongoose";
const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    amenties: [
        {
            type: mongoose.Schema.Types.String,
        }
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
        }
    ],
    street: {
        type: String,
        require: true,
    },
    district: {
        type: String,
        require: true,
    },
    country: {
        type: String,
        require: true,
    },
    slotBookingInfo: [
        {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
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