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
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
        }
    ],
    rating: {
        type: Number,
        default: 0,
    },
    photoLink : {
        type: String,
    },
    price: {
        type: Number,
        min: 0,
        required: true,
    },
    schedule: {
        days: {
            type: [String],
            enum: ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"],
        },
        time: [ 
            {
                type: Object,
                hour: {
                    type: Number,
                    min: 0,
                    max: 12,
                },
                minute: {
                    type: Number,
                    min: 0,
                    max: 59,
                },
                meridian: {
                    type: String,
                    enum: ["AM","PM"],
                }
            }
        ]
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
    },
    overAllRating: {
        type: Number,
        default: 0,
    },
    totalReviews:{
        type: Number,
        default: 0,
    },
    seats: {
        type: Number,
        default: 0,
    }
});

const Court = mongoose.model("Court",Schema);
export default Court;