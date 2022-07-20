import {body } from "express-validator";


const postFavouritesFolderValidation = [
    body("folderName")
    .trim()
    .notEmpty().withMessage("folder name is required")
    .isLength({ min: 2, max: 100 }).withMessage("name must b greater than 2 characters and smaller than 100.")
];

const updateFavouriteFolderValidation =  [
    body("folderName")
    .trim().notEmpty().withMessage("folder name is required")
    .isLength({ min: 2, max: 100 }).withMessage("name must b greater than 2 characters and smaller than 100.")
];
    

export {
    postFavouritesFolderValidation,
    updateFavouriteFolderValidation
};