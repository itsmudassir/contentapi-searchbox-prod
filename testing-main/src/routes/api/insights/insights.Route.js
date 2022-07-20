import express from "express";
import authorize from "../../../middlewares/authorize.js";
const router = express.Router();
import { getInsights, getCustomTopicInsights } from "../../../controllers/insights/insights.Controller.js"



// route:  POST /api/insights/getInsights
// desc:   getting insights with startDate, endDate, category and customQuery
// access: PROTECTED
router.post("/getInsights", getInsights);
router.post("/getCustomTopicInsights", getCustomTopicInsights);

export default router;