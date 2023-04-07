import mongoose from "mongoose";

/*
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
    images: [{ path: String }],
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


*/

const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  tweetId : {
        type: String,
        required : [true, "Please provide unique TweetId"],
        unique: [true, "TweetId Exist"]
    },
  username : {
        type: String,
        required : [true, "Please provide unique Username"],
        uniquen [true, "Username Exist"]
    },
  content: {
    type: String,
    required: true,
    unique: false
  },
  images: [{
    path: String
  }],
  date: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Number,
    default: 0
  },
  retweets: {
    type: Number,
    default: 0
  },
  hashtags: [{
    type: String
  }],
  mentions: [{
    type: String
  }],
  inReplyTo: {
    type: String
  },
  quotedTweet: {
    type: String
  },
  isRetweet: {
    type: Boolean,
    default: false
  },
  retweetedBy: {
    type: String
  },
  comments:[{
    userId: String,
    comment: String
  }],
  replyCount: {
    type: Number,
    default: 0
  },
  quoteCount: {
    type: Number,
    default: 0
  },
  retweetCount: {
    type: Number,
    default: 0
  },
  favoriteCount: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Tweet', tweetSchema);

