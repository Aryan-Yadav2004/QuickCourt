import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    
    street: {
        type: String,
        require: true,
    },
    district: {
        type: String,
        require: true,
    },
    state: {
        type: String,
        require: true,
    },
    country: {
        type: String,
        require: true,
    },
    pinCode: {
        type: String, // to preserve leading zero
        require: true,
        validate: {
            validator: function (v){
                return /^\d{6}$/.test(v);
            }
        },
        message: props => `${props.value} pin code should be of six digit`
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    profileImg: {
        type: String,
    },
    photos: [{
        type: String,
    }],
    about: {
        type: String,
    },
    courts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Court",
        }
    ],
});

const Facility = mongoose.model("Facility",Schema);
export default Facility;