import mongoose from "mongoose";
const Schema = new mongoose.Schema({
    sport: {
        type: String,
        required: true,
        enum: {
            values: [
            "soccer", "cricket", "basketball", "tennis", "volleyball", "rugby", "hockey", "baseball",
            "table tennis", "badminton", "athletics", "swimming", "boxing", "wrestling", "judo", "karate",
            "taekwondo", "fencing", "archery", "cycling", "golf", "gymnastics", "skiing", "snowboarding",
            "figure skating", "speed skating", "curling", "equestrian", "rowing", "canoeing", "sailing",
            "shooting", "triathlon", "polo", "surfing", "skateboarding", "climbing", "e-sports"
            ],
            message: "No other sports available",
        }
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
    rating: {
        type: Number,
        default: 0,
    },
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