import mongoose from "mongoose";

const Scheme = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: Number,
        required: true,
        unique: true,
        max: 9999999999,
        min: 1000000000 
    },
    role: {
        type: String,
        enum: {
            values: ["user", "facilityOwner", "admin"],
            message: "No such role exists"
        }
    },
    bookings : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
        }
    ],
    facility: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Facility",
        }
    ],
    avtar: {
        type: String,
    },
    status: {
        type: String,
        enum: {
            values: ["active", "banned"],
            message: "status should be either or banned"
        },
        default: "active",
    }
}); 

const User = mongoose.model("User",Scheme);
export default User;