import mongoose from "mongoose";
const Schema = mongoose.Schema;

const favouritePostsSchema = new Schema({
    folderId: {
        type: Schema.Types.ObjectId,
        ref: "favouritesFolderModel"
    },
    
    userId: {
        type: Schema.Types.ObjectId,
        ref: "userModel"
    },

    article_length:{
        type:Number
    },

    title: {
        type: String,
    },

    maintext: {
        type: String,
    },

    authors:[String],

    category: {
        type: String,
    },

    language: {
        type: String,
    },

    source_domain: {
        type: String,
    },

    readtime: {
        type: Number,
    },

    sentiment: {
        type:String
    },

    facebook_shares: {
        type: Number,
    },

    twitter_shares: {
        type: Number,
    },

    __typename:{
        type:String
    },

    image_url: {
        type: String,
    },

    url: {
        type: String,
    },

    post_id: {
        type: String,
    },
    
    date_download: {
        type: Date
    },
    isLiked:{
        type: Boolean
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

const favouritePostsModel = mongoose.model("favouritePost", favouritePostsSchema);

export default favouritePostsModel;