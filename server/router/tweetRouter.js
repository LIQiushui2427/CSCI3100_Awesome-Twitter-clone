import {Router} from "express";
import { verifyUser } from "../controllers/appController.js";
import * as controller from '../controllers/tweetController.js';
import Auth, {localVariables}  from "../middleware/auth.js";
import multer from'multer';

const upload = multer({ dest: 'uploads/' });


const userRouter = Router();

/* POST request*/
userRouter.route("/createTweet").post(
    upload.array("images", 4), // the "images" field should match the name attribute of your file input field
    controller.createTweet
);

userRouter.route('/tweets').get(verifyUser, controller.loadTweets);
userRouter.route('/deleteTweet').delete(verifyUser, controller.deleteTweet);
userRouter.route('/likeTweet').post(verifyUser, controller.likeTweet);
userRouter.route('/searchTweets').get(controller.searchTweets);
userRouter.route('/getTweetById').get(controller.getTweetById);//if just /:tweetId, get alltweet will be called
userRouter.route('/loadAllTweets').get(controller.loadAllTweets);
export default userRouter;