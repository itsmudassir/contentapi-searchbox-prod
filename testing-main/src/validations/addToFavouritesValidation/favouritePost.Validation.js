import { body } from "express-validator";

const postValidation = [
    // body("index")
    //     .trim(),
        // .notEmpty().withMessage("Index field can not be empty"),
    body("title")
        .trim(),
        // .notEmpty().withMessage("Title field can not be empty.")
        // .isLength({ min: 4, max: 200 }).withMessage("title can be minimum of 4 characters and maximum 200 characters."),
    body("maintext")
        .trim(),
        // .notEmpty().withMessage("main text can not be empty")
        // .isLength({ min: 20, max: 1000 }).withMessage("Minimum characters can be 50 and maximum characters can be 1000"),
    body("category")
        .trim(),
        // .notEmpty().withMessage("Category can not be empty"),
    // body("language")
    //     .trim(),
        // .notEmpty().withMessage("language can not be empty"),
    body("source_domain")
        .trim()
        // .notEmpty().withMessage("Source Domain can not be empty"),

    // body("facebook")
    //     .notEmpty().withMessage("Facebook can not be empty")
    //     // .isNumeric().withMessage("Must enter a numeric value"),
    // body("twitter")
    //     .notEmpty().withMessage("twitter can not be empty")
    //     .isNumeric().withMessage("Must enter a numeric value"),
    // body("image_url")
    //     .trim()
    //     .notEmpty().withMessage("Image url can not be empty")
    //     .isURL().withMessage("Kindly provide the correct image url"),
    // body("url")
    //     .trim()
    //     .notEmpty().withMessage("url can not be empty")
    //     .isURL().withMessage("Kindly provide the correct url"),
    // body("post_id")
    //     .trim()
    //     .notEmpty().withMessage("Post id can not be empty"),
    // body("date_publish")
    //     .trim()
    //     .notEmpty().withMessage("Published date can not be empty")
];


const updateValidation = [
    
    body("index")
        .trim()
        .notEmpty().withMessage("Index field can not be empty"),
    body("title")
        .trim()
        .notEmpty().withMessage("Title field can not be empty.")
        .isLength({ min: 4, max: 200 }).withMessage("title can be minimum of 4 characters and maximum 200 characters."),
    body("maintext")
        .trim()
        .notEmpty().withMessage("main text can not be empty")
        .isLength({ min: 50, max: 1000 }).withMessage("Minimum characters can be 50 and maximum characters can be 1000"),
    body("category")
        .trim()
        .notEmpty().withMessage("Category can not be empty"),
    body("language")
        .trim()
        .notEmpty().withMessage("language can not be empty"),
    body("source_domain")
        .trim()
        .notEmpty().withMessage("Source Domain can not be empty"),
    body("readtime")
        .notEmpty().withMessage("Read time can not be empty")
        .isNumeric().withMessage("Must enter a numeric value"),
    body("facebook")
        .notEmpty().withMessage("Facebook can not be empty")
        .isNumeric().withMessage("Must enter a numeric value"),
    body("twitter")
        .notEmpty().withMessage("twitter can not be empty")
        .isNumeric().withMessage("Must enter a numeric value"),
    body("image_url")
        .trim()
        .notEmpty().withMessage("Image url can not be empty")
        .isURL().withMessage("Kindly provide the correct image url"),
    body("url")
        .trim()
        .notEmpty().withMessage("url can not be empty")
        .isURL().withMessage("Kindly provide the correct url"),
    body("post_id")
        .trim()
        .notEmpty().withMessage("Post id can not be empty"),
    body("date_publish")
        .trim()
        .notEmpty().withMessage("Published date can not be empty")
];


export {
    postValidation,
    updateValidation
};