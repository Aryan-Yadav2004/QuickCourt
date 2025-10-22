import express from "express";
import { getAllBookings, getUser, updateUser } from "../../controllers/userController.js";
import {handleLogin, handleRegister, handleLogOut, verifyUser} from "../../auth/auth.js"
import { cancelBooking, getBooking } from "../../controllers/bookingController.js";
import { bookingAuthorization, isLogedIn, userAuthorization, userCreateValidator, userUpdateValidator } from "../../../middlewares.js";
const router = express.Router();


router.route("/register")
.post(userCreateValidator,handleRegister)

router.route("/login")
.post(handleLogin)

router.route("/logout")
.post(isLogedIn,handleLogOut)


router.route("/verify").get(verifyUser);

router.route("/:id")
.get(isLogedIn,userAuthorization,getUser)
.patch(isLogedIn,userAuthorization,userUpdateValidator,updateUser)
router.route("/:id/bookings").get(isLogedIn,userAuthorization,getAllBookings);
router.route("/:id/bookings/:bookingId").get(isLogedIn,userAuthorization,bookingAuthorization,getBooking);
router.route("/:id/bookings/:bookingId/cancel").patch(isLogedIn,userAuthorization,bookingAuthorization,cancelBooking);





export default router;