import express from "express";
import v1CourtRouter from "./courtRouter.js";
import { createFacility, deleteFacility, readFacility, updateFacility } from "../../controllers/facilityController.js";
const router = express.Router();

router.route("/new")
.post(createFacility);



router.delete("/:id/delete",deleteFacility);

router.patch("/:id/edit",updateFacility);

router.get("/:id",readFacility);

router.use("/:id/courts", v1CourtRouter);

export default router;