import mongoose from "mongoose";

export const TweetSchema = new mongoose.Schema({
    tweetId : {
        type: String,
        required : [true, "Please provide unique TweetId"],
        unique: [true, "TweetId Exist"]
    },
    username : {
        type: String,
        required : [true, "Please provide unique Username"],
        unique: [false, "Username Exist"]
    },
    content: {
        type: String,
        required: [true, "Please provide a content"],
        unique : false,
    },
    date: {
        type: Date,
    },
    likes: {
        type: Number,
    },
    retweets: {
        type: Number,
    },
});

export default mongoose.model.Tweets || mongoose.model('Tweet', TweetSchema);