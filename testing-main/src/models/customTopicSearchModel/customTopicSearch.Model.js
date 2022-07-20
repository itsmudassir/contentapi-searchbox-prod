import mongoose from "mongoose";
const Schema = mongoose.Schema;


const customTopicsSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: "userModel",
    },

    name: {
        type: String,
    },


    filters: {

        type: {  // title or body. from radio buttons
            type: String, 
        },
        sort: { // hardcode sort
            type: String,
        },
        startdate: { // hardcode
            type: Date,
        },
        enddate: { // hardcode
            type: Date,
        },
        language: { // hardcode "english"
            type: String,
        },
        engagement: { // hardcode "facebook"
            type: String
        }
    },

    selection: {
        match_type: { // "topic" or "domain". from radio buttons
            type: String,
        },
        sources: {
            type: String,
        },
        any_keywords: [String], //any atleast one
        must_also_keywords: [String],
        must_not_contains_keywords: [String],
        include_domains: [String], // empty
        exclude_domains: [String],
        limit_domains_results: [String],
    },

    date: {
        type: Date,
        default: Date.now,
    },
});

const customTopicsModel = mongoose.model("customTopic", customTopicsSchema); 
export default customTopicsModel;