import express from "express"
const router = express.Router();
import {
    postFavouriteFolder,
    getSingleFavouriteFolder,
    getAllFavouriteFolder,
    deleteSingleFolder,
    deleteAllfavouritesFolder,
    updateFavouriteFolder
} from "../../../controllers/addToFavouriteControllers/favouritesFolder.Controller.js"
import {
    postFavouritesFolderValidation,
    updateFavouriteFolderValidation
} from "../../../validations/addToFavouritesValidation/favouritesFolder.Validation.js";
import authorize from "../../../middlewares/authorize.js"


// route:  POST /api/favouritesFolder/
// desc:   creating favourites folder by user id
// access: PROTECTED
router.post("/", authorize(), postFavouritesFolderValidation , postFavouriteFolder);



// route:  GET /api/favouritesFolder/:id
// desc:   sending a single folder by folder id
// access: PROTECTED
router.get("/:id", authorize(), getSingleFavouriteFolder);




// route:  GET /api/favouritesFolder/
// desc:   getting all user folders by user id
// access: PROTECTED
router.get("/", authorize(), getAllFavouriteFolder);




// route:  DELETE /api/favouritesFolder/:id
// desc:   deleting a single folders by folder id
// access: PROTECTED
router.delete("/:id", authorize(), deleteSingleFolder);




// route:  DELETE /api/favouritesFolder/
// desc:   deleting all folders by user id
// access: PROTECTED
router.delete("/", authorize(), deleteAllfavouritesFolder);



// route:  PATCH /api/favouritesFolder/:id
// desc:   updating a folders by folder id
// access: PROTECTED
router.patch("/:id", authorize(), updateFavouriteFolderValidation ,updateFavouriteFolder);

export default router;