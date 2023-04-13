
import mongoose from "mongoose";


export const TweetSchema = new mongoose.Schema({
  nickname: {
    type: String,
  },
  tweetId: {
    type: String,
    required: [true, "Please provide unique TweetId"],
    unique: [true, "TweetId Exist"]
  },
  username: {
    type: String,
    required: [true, "Please provide unique Username"],
    unique: [false, "Username Exist"]
  },
  content: {
    type: String,
    required: [true, "Please provide a content"],
    unique: false,
  },
  images: {
    type: String,
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
  commentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  isRetweet: {
    type: Boolean,
    required:true,
    default:false,
  },
  retweetUser:{
    type: String,
  },
  originalTime:{
    type: Date,
  },
  likedUsers: [{ type: String, ref: "likedUsers" }],
});


export default mongoose.model.Tweets || mongoose.model('Tweet', TweetSchema);


/*

import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
  tweetId : {
        type: String,
        required : [true, "Please provide unique TweetId"],
        unique: [true, "TweetId Exist"]
    },
  username : {
        type: String,
        required : [true, "Please provide unique Username"],
        uniquen:[true, "Username Exist"]
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
  likesCount: {
    type: Number,
    default: 0
  },
  likedBy:[{
    userId:String,
    unique:[True, 'have liked this tweet']
  }],
  dislikesCount: {
    type: Number,
    default: 0
  },
  dislikedBy:[{
    userId:String,
    unique:[True, 'have disliked this tweet']
  }],
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
    type: String //TweetId 
  },
  quotedTweet: {
    type: String //TweetId
  },

  isRetweet: {
    type: Boolean,
    default: false
  },
  originalTweet: {
    type: String, //TweetId
    ref: 'Tweet',
    if: function() { return this.isRetweet; } 
  },

  retweetedBy: {
    type: String //TweetId
  },
  comments:[{
    userId: {type:String},
    comment: {type:String},
    comment_date:{type:Date}
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

*/