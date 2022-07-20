import express from "express"
import {
    createFollowedTopic,
    readAllFollowedTopic,
    deleteFollowedTopic,
    isFollowingTopic
} from "../../../controllers/followedTopicsControllers/followedTopics.Controller.js"
import authorize from "../../../middlewares/authorize.js";

const router = express.Router();

// route:  POST /api/followedTopics/
// desc:   create a topic by authenticated user id
// access: PROTECTED
router.post("/", authorize(), createFollowedTopic);


// route:  GET /api/followedTopics/
// desc:   read all topics by authenticated user id
// access: PROTECTED
router.get("/", authorize(), readAllFollowedTopic);


// route:  POST /api/followedTopics/isFollowingTopic
// desc:   check if the topic name exist in the DB
// access: PROTECTED
router.post("/isFollowingTopic", authorize(), isFollowingTopic);


// route:  DELETE /api/followedTopics/
// desc:   delete topic by topic id
// access: PROTECTED
router.delete("/", authorize(), deleteFollowedTopic);

export default router;
