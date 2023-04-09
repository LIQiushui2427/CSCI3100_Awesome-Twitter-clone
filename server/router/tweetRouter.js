import { Router } from "express";
import { verifyUser } from "../controllers/appController.js";
import * as controller from "../controllers/tweetController.js";
import * as commentController from "../controllers/commentController.js"
import Auth from "../middleware/auth.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const tweetRouter = Router();

/* POST requests */
tweetRouter.route("/createTweet").post(
  upload.array("images", 4), // the "images" field should match the name attribute of your file input field
  controller.createTweet
);

tweetRouter.route("/:tweetId/createComment").post(
  verifyUser,
  commentController.createComment
);

/* DELETE requests */
tweetRouter.route("/deleteTweet").delete(
  verifyUser,
  controller.deleteTweet
);

tweetRouter.route("/deleteComment/:commentId").delete(
  verifyUser,
  commentController.deleteComment
);

tweetRouter.route("/:tweetId/comments").get(
  verifyUser,
  commentController.loadTweetComments
);
/* POST requests for liking/unliking a tweet */
tweetRouter.route("/likeTweet").post(
  verifyUser,
  controller.likeTweet
);

tweetRouter.route("/unlikeTweet").post(
  verifyUser,
  controller.unlikeTweet
);

/* GET requests */
tweetRouter.route("/tweets").get(
  verifyUser,
  controller.loadTweets
);

tweetRouter.route("/searchTweets").get(controller.searchTweets);

tweetRouter.route("/getTweetById").get(
  controller.getTweetById
);

tweetRouter.route("/loadAllTweets").get(controller.loadAllTweets);

export default tweetRouter;
