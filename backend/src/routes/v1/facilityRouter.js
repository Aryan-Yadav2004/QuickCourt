import express from "express";
import handleFacility from "../../controllers/facilityController.js";
const router = express.Router();

router.route("/new")
.post(handleFacility);

export default router;