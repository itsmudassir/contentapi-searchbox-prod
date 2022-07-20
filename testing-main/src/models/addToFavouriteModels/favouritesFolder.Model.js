import mongoose from "mongoose";
const Schema = mongoose.Schema;

const favouritesFolderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "userModel"
    },
    folderName: {
        type: String,
        trim: true,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    }

});

const favouritesFolderModel = mongoose.model("FavouritesFolder", favouritesFolderSchema);

export default favouritesFolderModel;