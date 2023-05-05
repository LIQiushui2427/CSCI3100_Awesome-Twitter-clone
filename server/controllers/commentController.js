import ENV from '../config.js'
import TweetModel from '../model/Tweet.model.js';
import UserModel from '../model/User.model.js';
import CommentModel from '../model/Comment.model.js';
/*
This file contains the functions that are used to handle the requests related to comments.
There are 4 functions in this file:
1. createComment: create a new comment
2. getCommentById: get a comment by its commentId
3. loadTweetComments: load all the comments for a tweet
4. deleteComment: delete a comment
*/
export async function getCommentById(req, res) {
  const { commentId } = req.query;
  try {
    const comment = await CommentModel.findOne({ commentId });
    if (!comment) {
      return res.status(404).send({ error: "Comment not found" });
    }
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

export async function loadTweetComments(req, res) {
  const { tweetId } = req.query;
  console.log("loadTweetComments: tweetId: ", tweetId);
  try {
    const tweet = await TweetModel.findOne({ tweetId });
    if (!tweet) {
      return res.status(404).send({ error: "loadTweetComments: Tweet not found" });
    }
    const comments = await CommentModel.find({ tweetId });
    return res.status(200).send(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
}

export async function deleteComment(req, res) {
  const { commentId } = req.body;
  if (!commentId) {
    return res.status(400).send({ error: "CommentId is required" });
  }
  try {
    const comment = await CommentModel.findOne({ commentId });
    if (!comment) {
      return res.status(404).send({ error: "Comment not found" });
    }
    await comment.deleteOne();
    res.status(200).send({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

export async function createComment(req, res) {
  try {
    const { tweetId, content, profile, nickname, replyTo, quotedText, images } = req.body;
    const username = req.query.username;

    if (!tweetId) {
      return res.status(400).send({ error: "TweetId is required" });
    }
    if (!username) {
      return res.status(400).send({ error: "Username is required" });
    }
    if (!content) {
      return res.status(400).send({ error: "Content is required" });
    }

    const newComment = new CommentModel({
      commentId: Math.random().toString(20),
      tweetId,
      nickname,
      profile,
      username,
      replyTo,
      quotedText,
      images,
      content,
      date: new Date(),
      likes: 0,
    });

    await newComment.save();

    res.status(201).json({ commentId: newComment.commentId });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ error: "Internal Server Error in createComment" });
  }
}




