/*
import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
    isAdmin: {
        type: Boolean,
        required: true,
        default:false,
    },
});

export default mongoose.model.Users || mongoose.model('User', UserSchema);

*/



import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'Please provide unique UserId'],
    unique: [true, 'UserId Exist']
  },
  username: {
    type: String,
    required: [true, 'Please provide unique Username'],
    unique: [true, 'Username Exist']
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default:false,
},
  bio: {
    type: String,
    required: false
  },
  location: {
    type: String,
    required: false
  },
  website: {
    type: String,
    required: false
  },
  birthday: {
    type: Date,
    required: false
  },
  joinedDate: {
    type: Date,
    required: true
  },
  avatar: {
    type: String,
    required: false
  },
  bannerImage: {
    type: String,
    required: false
  },
  following: [{
    userId: String,
    username: String
  }],
  followingCount:{
    type: Number,
    default: 0
  },
  followers: [{
    userId: String,
    username: String
  }],
  followerCount:{
    type: Number,
    default: 0
  },
  tweets: [{
    tweetId: {
    type: String,
    unique: [true,'Tweet exist']}
  }],
  likedTweets: [{
    tweetId: {
        type: String,
        unique: [true,'Tweet exist']}
  }],
  retweetedTweets: [{
    tweetId: {
        type: String,
        unique: [true,'Tweet exist']}
  }],
  replies:[{
    tweetId: {
        type: String,
        unique: [true,'Tweet exist']},
    reply_content:{type:String, required: {true: 'Please provide the reply'}},
    date:{type:Date,required:{true: 'Please provide the reply'}},
    required: false
  }],
  notificationSettings: {
    type: Object,
    required: false
  }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);

