import express from "express";
import { createFacility, deleteFacility, readFacility, updateFacility } from "../../controllers/facilityController.js";
const router = express.Router();

router.route("/new")
.post(createFacility);



router.delete("/delete/:id",deleteFacility);

router.patch("/edit/:id",updateFacility);

router.get("/:id",readFacility);

export default router;