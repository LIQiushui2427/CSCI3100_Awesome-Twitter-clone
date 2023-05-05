import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Defining the user schema
export const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required : [true, "Please provide unique Username"],
        unique: [true, "Username Exist"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique : false,
    },
    email: {
        type: String,
        required : [true, "Please provide a unique email"],
        unique: [false, "Email Exist"]
    },
    Nickname: { type: String },
    profile: { type: String },
    biography: {type: String}, 
    followers: { type: Array, default: [] },
    following: { type: Array, default: [] },
    isAdmin: {
        type: Boolean,
        required: true,
        default:false,
    },
    cover: {type:String}
});

export default mongoose.model.Users || mongoose.model('User', UserSchema);