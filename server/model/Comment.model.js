import mongoose from "mongoose";


const CommentSchema = new mongoose.Schema({
  commentId: {
    type: String,
    required: [true, 'Please provide unique commentId'],
    unique: [true, 'commentId Exist']
  },
  username: {
    type: String,
    required: [true, 'Please provide the username']
  },
  tweetId: {
    type: String,
    required: [true, 'Please provide the tweet Id']
  },
  replyTo: {
    type: String
  },
  images: [{
    type: String
  }],
  time: {
    type: Date,
    default: Date.now
  },
  content: {
    type: String,
    required: [true, 'Please provide a content'],
    unique: false
  }
});

export default mongoose.model.Comments || mongoose.model('Comment', CommentSchema);

