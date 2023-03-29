import express from "express";
import { protect } from "../middleware/auth.js";
import * as tweetController from "../controllers/tweetController.js";

const router = express.Router();

router.route("/").post(protect, tweetController.createTweet);

router.route("/:id").delete(protect, tweetController.deleteTweet);

router.route("/:id").get(protect, tweetController.getTweetById);

router.route("/").get(protect, tweetController.getTweets);

export default router;