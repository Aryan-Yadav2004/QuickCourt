import express from "express";
import { createCourt } from "../../controllers/courtController.js";
const router = express.Router({mergeParams: true});

router.route("/new").post(createCourt);

export default router;