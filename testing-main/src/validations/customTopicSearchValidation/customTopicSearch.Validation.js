import { validationResult, body } from "express-validator";
import validator from "validator";

const postValidation = [
    body("name")
        .trim()
        .notEmpty().withMessage("Name field can not be empty")
        .isLength({ min: 3, max: 100 }).withMessage("Name field can be 100 characters maximum and 3 characters minimum")


    // body("match_type")
    //     .trim()
    //     .notEmpty().withMessage("Match type field can not be empty"),

    // body("any_keywords")
    // .custom((value)=>{
    //     value.forEach(element => {
    //         if (element.length > 100) {
    //             throw new Error(element + "Any keywords must be smaller than 100 characters");
    //         }
    //     });
    //     return true;
    // }),

    // body("must_also_keywords")
    // .custom((value)=>{
    //     value.forEach(element => {
    //         if (element.length > 100) {
    //             throw new Error(element + "Must also keywords must be smaller than 100 characters");
    //         }
    //     });
    //     return true;
    // }),

    // body("must_not_contains_keywords")
    //     .custom((value)=>{
    //         value.forEach(element => {
    //             if (element.length > 100) {
    //                 throw new Error(element + "Must not contain keywords must be smaller than 100 characters");
    //             }
    //         });
    //         return true;

    //     }),

    // body("exclude_domains")
    //     .custom((value) => {
    //         value.forEach(element => {
    //             if (!validator.isURL(element)) {
    //                 throw new Error(element + " Exclude domain must be a URL in ");
    //             }
    //         });

    //         value.forEach(element => {
    //             if (element.length > 150) {
    //                 throw new Error(element + " Exclude domain must be smaller than 150 characters");
    //             }
    //         });
    //         return true;
    //     }),

    // body("limit_domains_results")
    //     .custom((value) => {
    //         value.forEach(element => {

    //             if (!validator.isURL(element)) {
    //                 throw new Error(element + " Limit domain must be a URL");
    //             }
    //         });

    //         value.forEach(element => {
    //             if (element.length > 150) {
    //                 throw new Error(element + "Limit domain must be smaller than 150 characters");
    //             }
    //         });
    //         return true;
    //     }),

    // body("enddate")
    //     .trim()
    //     .isLength({ max: 50 }).withMessage("End Date field must be smaller than 50 characters")
    //     .isDate().withMessage("End date field must be a date of format YY-MM-DD"),

    // body("startdate")
    //     .trim()
    //     .isLength({ max: 50 }).withMessage("Start date field must be smaller than 50 characters")
    //     .isDate().withMessage("Start date field must be a date of format YY-MM-DD"),

    // body("language")
    //     .trim()
    //     .isLength({ max: 50 }).withMessage("language field must be smaller than 50 characters")

];


const patchvalidation = [
    // body("name")
    //     .trim()
    //     .notEmpty().withMessage("Name field can not be empty")
    //     .isLength({ min: 3, max: 50 }).withMessage("Name field can be 50 characters maximum and 3 characters minimum"),

    // body("match_type")
    //     .trim()
    //     .notEmpty().withMessage("Match type field can not be empty"),

    // body("any_keywords")
    //     .trim()
    //     .isLength({ max: 100 }).withMessage("Any keyword field must be smaller then 100 characters"),

    // body("must_also_keywords")
    //     .trim()
    //     .isLength({ max: 100 }).withMessage("Must also keyword field must be smaller then 100 characters"),

    // body("must_not_contains_keywords")
    //     .trim()
    //     .isLength({ max: 100 }).withMessage("Must not contain keywords field must be smaller then 100 characters"),

    // body("exclude_domains")
    //     .custom((value) => {
    //         value.forEach(element => {
    //             if (!validator.isURL(element)) {
    //                 throw new Error(element + " must be a URL in Limit domains");
    //             }
    //         });

    //         value.forEach(element => {
    //             if (element.length > 150) {
    //                 throw new Error(element + " must be smaller than 150 characters");
    //             }
    //         });
    //         return true;
    //     }),

    // body("limit_domains_results")
    //     .custom((value) => {
    //         value.forEach(element => {

    //             if (!validator.isURL(element)) {
    //                 throw new Error(element + " must be a URL in Limit domains");
    //             }
    //         });

    //         value.forEach(element => {
    //             if (element.length > 150) {
    //                 throw new Error(element + " must be smaller than 150 characters");
    //             }
    //         });
    //         return true;
    //     }),

    // body("enddate")
    //     .trim()
    //     .isLength({ max: 50 }).withMessage("End Date field must be smaller than 50 characters")
    //     .isDate().withMessage("End date field must be a date of format YY-MM-DD"),

    // body("startdate")
    //     .trim()
    //     .isLength({ max: 50 }).withMessage("Start date field must be smaller than 50 characters")
    //     .isDate().withMessage("Start date field must be a date of format YY-MM-DD"),

    // body("language")
    //     .trim()
    //     .isLength({ max: 50 }).withMessage("language field must be smaller than 50 characters")

];



export { postValidation, patchvalidation };