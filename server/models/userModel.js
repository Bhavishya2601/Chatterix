import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    provider: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim : true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    id: {
        type: String,
        required: true,
        trim: true
    },
    isAvatarSet: {
        type: Boolean,
        default: false
    },
    avatarImage: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User', userSchema)
export default User