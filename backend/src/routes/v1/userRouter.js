import express from "express";
import { handleLogin, handleRegister } from "../../controllers/userController.js";
const router = express.Router();


router.route("/register")
.post(handleRegister);

router.route("/login")
.post(handleLogin);

export default router;