import express from "express";
import {getCategories , postData} from "../../../controllers/articleSearchControllers/articlesSearch.Controller.js"
import esRedisMiddleware from "../../../middlewares/esRedisMiddleware.js"
import authorize from "../../../middlewares/authorize.js"

const router = express.Router();

// route: GET /api/articleSearch/category
// desc:  getting all categories from ES and caching. 
// access: PROTECTED
router.get("/category", authorize(),  getCategories);


// route: POST /api/articleSearch/
// desc:  getting filers from user and returning articles and caching. 
// access: PROTECTED
router.post("/", authorize(), esRedisMiddleware, postData);

export default router;
