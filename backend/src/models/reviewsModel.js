import mongoose from "mongoose";
const Schema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User",
    },
    court_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Court",
    },
    review:{
        type: String,
        require: true,
    },
    rating: {
        type: Number,
        max: 5,
        min: 0,
    },
    date: {
        type: Date,
        require: true,
    },
});
const Review = mongoose.model("Review", Schema);
export default Review;