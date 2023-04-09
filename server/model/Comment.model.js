import mongoose from "mongoose";


const CommentSchema = new mongoose.Schema({
  commentId: {
    type: String,
    required: [true, 'Please provide unique commentId'],
    unique: [true, 'commentId Exist']
  },
  author: {
    type: String,
    required: [true, 'Please provide the author name']
  },
  tweetId: {
    type: mongoose.Schema.Types.ObjectId,
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

