import mongoose from "mongoose";

const wakeupModelSchema = new mongoose.Schema({

    title: {
        type: String
    }


});


const wakeupModel = mongoose.model("wakeups", wakeupModelSchema);

export default wakeupModel;