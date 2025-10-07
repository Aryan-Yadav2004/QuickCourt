import Review from "../models/reviewsModel.js";
import User from "../models/userModel.js";
import Court from "../models/courtModel.js";
import jwt from "jsonwebtoken";
const createReview = async (req,res) => {
    try {
        const token = req.cookies?.token;
        const { courtId } = req.params;
        const {_id, username, role} = jwt.decode(token);
        const user = await User.findOne({_id: _id});
        const court = await Court.findOne({_id: courtId});
        const { reviewDescription, rating } = req.body;
        const review = new Review({
            user_id: user._id,
            court_id: court._id,
            review: reviewDescription,
            rating: rating,
        });
        const result = await review.save();
        court.reviews.push(result._id);
        await court.save();
        res.status(200).json({message: "review create"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateReview = async (req,res) => {
    try {
        const { reviewId } = req.params;
        const review = await Review.findOne({_id: reviewId});
        const { reviewDescription, rating } = req.body;
        review.review = reviewDescription;
        review.rating = rating;
        await review.save();
        res.status(200).json({message: "review updated sucessfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteReview = async (req,res) => {
    try {
        const { courtId,reviewId } = req.params;
        const court = await Court.findOne({_id: courtId});
        const review = await Review.findOne({_id: reviewId});
        court.reviews = court.reviews.filter(id => !id.equals(review._id));
        await court.save();
        
        await Review.deleteOne({_id: reviewId});
        res.status(200).json({message: "review deleted sucessfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export { createReview, updateReview, deleteReview };