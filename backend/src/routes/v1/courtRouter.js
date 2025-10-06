import express from "express";
import { createCourt, deleteCourt, readCourt, updateCourt } from "../../controllers/courtController.js";
const router = express.Router({mergeParams: true});

router.route("/new").post(createCourt);
router.route("/:courtId/delete").delete(deleteCourt);
router.route("/:courtId/edit").patch(updateCourt);
router.route("/:courtId").get(readCourt);

export default router;