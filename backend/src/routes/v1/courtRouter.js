import express from "express";
import { createCourt, deleteCourt, readCourt, updateCourt } from "../../controllers/courtController.js";
import { createBooking } from "../../controllers/bookingController.js";
import  reviewRouter from "./reviewsRouter.js";
const router = express.Router({mergeParams: true});

router.route("/new").post(createCourt);
router.route("/:courtId/delete").delete(deleteCourt);
router.route("/:courtId/edit").patch(updateCourt);
router.route("/:courtId").get(readCourt);
router.route("/:courtId/slot/:slotId").post(createBooking);
router.use("/:courtId/reviews",reviewRouter);
export default router;