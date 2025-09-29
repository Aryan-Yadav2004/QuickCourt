import mongoose from "mongoose";

const Scheme = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    username: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    token: {
        type: String,
    },
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
    phoneNo: {
        type: Number,
        require: true,
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
    booking : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "booking",
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
    }
}); 

const User = mongoose.model("User",Scheme);
export default User;