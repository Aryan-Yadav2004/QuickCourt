import mongoose from "mongoose";

const Schema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User",
    },
    facility:{
        type: String,
    },
    court: {
        type: String,
        require: true
    },
    street: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    },
    time :{
        type: Date,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    seats: {
        type: Number,
        require: true
    },
    slot_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Slot",
    },
    status: {
        type: String,
        enum: {
            values: ["booked","cancelled","completed"],
        }
    }
});

const Booking = mongoose.model("Booking",Schema);
export default Booking;