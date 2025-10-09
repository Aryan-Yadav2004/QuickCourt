import express from "express";
import { searchCourts, searchFacilities } from "../../controllers/searchController.js";
const router = express.Router();

router.get("/facilities",searchFacilities);
router.get("/courts",searchCourts); 

export default router;