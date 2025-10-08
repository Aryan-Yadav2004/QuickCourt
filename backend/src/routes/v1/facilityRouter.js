import express from "express";
import v1CourtRouter from "./courtRouter.js";
import { createFacility, deleteFacility, readFacility, updateFacility } from "../../controllers/facilityController.js";
import { facilityValidator, isLogedIn, ownerAuthorization, ownerAuthorizationFacility } from "../../../middlewares.js";
const router = express.Router();

router.use("/:facilityId/courts",v1CourtRouter);

router.route("/new").post(isLogedIn,ownerAuthorization,facilityValidator,createFacility);

router.delete("/:facilityId/delete",isLogedIn,ownerAuthorization,ownerAuthorizationFacility,deleteFacility);

router.patch("/:facilityId/edit",isLogedIn,ownerAuthorization,ownerAuthorizationFacility,facilityValidator,updateFacility);

router.get("/:facilityId",readFacility);



export default router;