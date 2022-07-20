import mongoose from "mongoose";

const userModelSchema = new mongoose.Schema({

    email: {
        type: String,
        unique: true,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    resetToken: {
        token: String,
        expires: Date
    },
    created: {
        type: String,
        default: Date.now
    },
    passwordReset: Date,
    verificationToken: String,
    acceptTerms: Boolean,
    verified: Date,
    updated: Date

});

userModelSchema.virtual("isVerified").get(function (){
    return !!(this.verified || this.passwordReset)
})

const userModel = mongoose.model("user", userModelSchema);

export default userModel;