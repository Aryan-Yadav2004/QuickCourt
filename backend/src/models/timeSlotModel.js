import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    time:  {
        type: Date,
        require: true,
    },
    price: {
        type: Number,
        require: true,
        min: 0,
    },
    court_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Court",
    },
    totalSeatsBooked: {
        type: Number,
        default: 0
    },
    bookings:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Booking",
        }
    ]
}); 
const Slot = mongoose.model("Slot",Schema);
export default Slot;