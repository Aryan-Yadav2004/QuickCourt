import mongoose from "mongoose";
import Court from "./courtModel";

const Schema = mongoose.Schema({
    time: {
        type: Date,
        require: true,
    },
    TotalSeats: {
        type: Number,
        require: true,
        min: 0,
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
    bookings:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Booking",
        }
    ]
});
const Slot = mongoose.model("Slot",Schema);
export default Slot;