import express from "express";
import { protect } from "../middleware/auth.js";
import * as tweetController from "../controllers/tweetController.js";

const router = express.Router();

router.route("/post").post(tweetController.createTweet);

router.route("/:id/delete").delete(protect, tweetController.deleteTweet);

router.route("/:id/getTweetById").get(protect, tweetController.getTweetById);

router.route("/getTweets").get(protect, tweetController.getTweets);

export default router;