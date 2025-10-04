import express from "express";
import { getUser, handleLogin, handleLogOut, handleRegister, updateUser } from "../../controllers/userController.js";
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

export default router;