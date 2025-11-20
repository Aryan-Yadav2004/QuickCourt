import express from "express";
import { getAllBookings, getAllUser, getUser, getUserByUsername, updateUser, updateUserStatus } from "../../controllers/userController.js";
import {handleLogin, handleRegister, handleLogOut, verifyUser} from "../../auth/auth.js"
import { cancelBooking, getBooking } from "../../controllers/bookingController.js";
import { bookingAuthorization, isAdmin, isLogedIn, userAuthorization, userCreateValidator, userUpdateValidator } from "../../../middlewares.js";
const router = express.Router();


router.route("/register")
.post(userCreateValidator,handleRegister)

router.route("/login")
.post(handleLogin)

router.route("/logout")
.post(isLogedIn,handleLogOut)


router.route("/verify").get(verifyUser);
//admin route
router.route("/getUsers").get(isLogedIn,isAdmin,getAllUser);
router.route("/getUserByUsername").get(isLogedIn,isAdmin,getUserByUsername);
router.route("/:id")
.get(isLogedIn,userAuthorization,getUser)
.patch(isLogedIn,userAuthorization,userUpdateValidator,updateUser)
router.route("/:id/bookings").get(isLogedIn,userAuthorization,getAllBookings);
router.route("/:id/bookings/:bookingId").get(isLogedIn,userAuthorization,bookingAuthorization,getBooking);
router.route("/:id/bookings/:bookingId/cancel").patch(isLogedIn,userAuthorization,bookingAuthorization,cancelBooking);
router.route("/:id/updateStatus").patch(isLogedIn,isAdmin,updateUserStatus);
export default router;