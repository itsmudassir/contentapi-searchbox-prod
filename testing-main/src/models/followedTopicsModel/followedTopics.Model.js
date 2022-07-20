import mongoose from "mongoose";

const followedTopicsSchema = mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel"
    },
    topic: {
        type: String,
        require: true
    }

})

const followedTopicsModel = mongoose.model("followedTopic", followedTopicsSchema);
export default followedTopicsModel;