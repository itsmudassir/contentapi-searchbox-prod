import express from "express";
import {
    postFavouritePost,
    getSinglePost,
    getAllPosts,
    deleteSinglePost,
    deleteAllPosts,
    updatePost,
    getAllPostsByUserId
} from "../../../controllers/addToFavouriteControllers/favouritePost.Controller.js"
import {
    postValidation,
    updateValidation
} from "../../../validations/addToFavouritesValidation/favouritePost.Validation.js"
import authorize from "../../../middlewares/authorize.js"
const router = express.Router();


// route:  POST /api/favouritePosts/:id
// desc:   creating post by favourites folder id
// access: PROTECTED
router.post("/:id", authorize(), postValidation , postFavouritePost);


// route:  GET /api/favouritePosts/post/:id
// desc:   reading a single post by post id
// access: PROTECTED
router.get("/post/:id", authorize(), getSinglePost);


// route:  GET /api/favouritePosts/all_posts/:id
// desc:   reading all posts in favourites folder by folder-id
// access: PROTECTED
router.get("/all_posts/:id", authorize(), getAllPosts);


// route:  GET /api/favouritePosts/all_posts
// desc:   reading all posts from favourite-posts model by User-id
// access: PROTECTED
router.get("/all_posts", authorize(), getAllPostsByUserId);


// route:  DELETE /api/favouritePosts/post/:id
// desc:   Deleting a post by post id
// access: PROTECTED
router.delete("/post/:id", authorize(), deleteSinglePost);


// route:  DELETE /api/favouritePosts/all_posts/:id
// desc:   Deleting all posts in favourites folder by folder id
// access: PROTECTED
router.delete("/all_posts/:id", authorize(), deleteAllPosts);


// route:  PATCH /api/favouritePosts/:id
// desc:   Updating a post by post id
// access: PROTECTED
router.patch("/:id", authorize() , updatePost);

export default router;