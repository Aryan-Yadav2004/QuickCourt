import mongoose from "mongoose";

const Schema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User",
    },
    slot_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Slot",
    },
    Status: {
        type: String,
        enum: {
            values: ["booked","cancelled","completed"],
        }
    }
});

const Booking = mongoose.model("Booking",Schema);
export default Booking;