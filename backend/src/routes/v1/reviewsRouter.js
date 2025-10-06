import express from "express";
import { createReview, deleteReview, updateReview } from "../../controllers/reviewController.js";
const router = express.Router();

router.post("/new",createReview);
router.patch("/:reviewId/edit",updateReview);
router.delete("/:reviewId/delete",deleteReview);

export default router;