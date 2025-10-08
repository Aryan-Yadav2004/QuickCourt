import express from "express";
import { createCourt, deleteCourt, readCourt, updateCourt } from "../../controllers/courtController.js";
import { createBooking } from "../../controllers/bookingController.js";
import  reviewRouter from "./reviewsRouter.js";
import { courtValidator, isLogedIn , ownerAuthorization, ownerAuthorizationCourt, ownerAuthorizationFacility, slotValidator} from "../../../middlewares.js";
const router = express.Router({mergeParams: true});

router.route("/new").post(isLogedIn,ownerAuthorization,ownerAuthorizationFacility,courtValidator ,createCourt);
router.route("/:courtId/delete").delete(isLogedIn,ownerAuthorization,ownerAuthorizationCourt,deleteCourt);
router.route("/:courtId/edit").patch(isLogedIn,ownerAuthorization,ownerAuthorizationCourt,courtValidator,slotValidator,updateCourt);
router.route("/:courtId").get(readCourt);
router.route("/:courtId/slot/:slotId").post(isLogedIn,ownerAuthorization,ownerAuthorizationCourt,createBooking);
router.use("/:courtId/reviews",reviewRouter);
export default router;