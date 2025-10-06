import express from "express";
import { getAllBookings, getUser, handleLogin, handleLogOut, handleRegister, updateUser } from "../../controllers/userController.js";
import { cancelBooking, getBooking } from "../../controllers/bookingController.js";
const router = express.Router();


router.route("/register")
.post(handleRegister)

router.route("/login")
.post(handleLogin)

router.route("/logout")
.post(handleLogOut)

router.route("/:id")
.get(getUser)
.patch(updateUser)

router.route("/:id/bookings/:bookingId").get(getBooking);
router.route("/:id/bookings/:bookingId/cancel").patch(cancelBooking);

router.route("/:id/bookings").get(getAllBookings);



export default router;