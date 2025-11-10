import Review from "../models/reviewsModel.js";
import User from "../models/userModel.js";
import Court from "../models/courtModel.js";
import jwt from "jsonwebtoken";
import Facility from "../models/facilityModel.js";



const createReview = async (req,res) => {
    try {
        const token = req.cookies?.token;
        const { facilityId,courtId } = req.params;
        const {_id, username, role} = jwt.decode(token);
        const user = await User.findOne({_id: _id});
        const court = await Court.findOne({_id: courtId});
        const facility = await Facility.findOne({_id: facilityId});
        const { reviewDescription, rating, date } = req.body;
        const review = new Review({
            user_id: user._id,
            court_id: court._id,
            review: reviewDescription,
            rating: rating,
            date: date,
        });
        
        const result = await review.save();
        court.reviews.push(result._id);
        
        court.rating = Math.round(((court.rating + rating) / (court.totalReviews + 1))*10)/10;;
        court.totalReviews = court.totalReviews + 1;
        facility.rating = Math.round(((facility.rating + rating) / (facility.totalReviews + 1))*10)/10;;
        facility.totalReviews = facility.totalReviews + 1;
        await facility.save();
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
        const court = await Court.findOne({_id: review.court_id});
        const { reviewDescription, rating } = req.body;
        court.rating = await calculateRating(court.rating - rating,review.court_id,false);
        review.review = reviewDescription;
        review.rating = rating;
        await review.save();
        await court.save();
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
        const facility = await Facility.findOne({_id: court.facility_id})
        court.reviews = court.reviews.filter(id => !id.equals(review._id));
        let div = court.totalReviews - 1;
        if(div === 0){
            div = 1;
        }
        court.rating = Math.round((((court.rating * court.totalReviews) - review.rating) / (div))*10)/10; 
        court.totalReviews = court.totalReviews - 1;
        div = facility.totalReviews - 1;
        if(div === 0){
            div = 1;
        }
        facility.rating = Math.round((((facility.rating * facility.totalReviews) - review.rating) / (div))*10)/10;
        facility.totalReviews = facility.totalReviews - 1;
        await facility.save();
        await court.save();
        await Review.deleteOne({_id: reviewId});
        res.status(200).json({message: "review deleted sucessfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export { createReview, updateReview, deleteReview };