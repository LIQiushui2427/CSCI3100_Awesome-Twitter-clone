import express from "express";
import { protect } from "../middleware/auth.js";
import Tweet from "../models/Tweet.js";

const tweetRouter = express.Router();

// @desc Create a new tweet
// @route POST /api/tweets
// @access Private
router.post("/", protect, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Please provide content for your tweet" });
    }

    const newTweet = new Tweet({
      user: req.user._id,
      content,
    });

    const savedTweet = await newTweet.save();

    res.status(201).json(savedTweet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// @desc Delete a tweet
// @route DELETE /api/tweets/:id
// @access Private
router.delete("/:id", protect, async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);

    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }

    if (tweet.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "You are not authorized to delete this tweet" });
    }

    await tweet.remove();

    res.json({ message: "Tweet deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// @desc Like a tweet
// @route POST /api/tweets/:id/like
// @access Private

router.post("/:id/like", protect, async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);

    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }

    if (tweet.likes.includes(req.user._id)) {
      return res.status(400).json({ message: "Tweet already liked" });
    }

    tweet.likes.push(req.user._id);

    await tweet.save();

    res.json(tweet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = tweetRouter;