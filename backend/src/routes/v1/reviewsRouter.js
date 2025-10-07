import express from "express";
import { createReview, deleteReview, updateReview } from "../../controllers/reviewController.js";
import { isLogedIn, reviewAuthorization } from "../../../middlewares.js";
const router = express.Router({mergeParams: true});

router.post("/new",isLogedIn,createReview);
router.patch("/:reviewId/edit",isLogedIn,reviewAuthorization,updateReview);
router.delete("/:reviewId/delete",isLogedIn,reviewAuthorization,deleteReview);
export default router;