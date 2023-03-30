import {Router} from "express";
import { verifyUser } from "../controllers/appController.js";
import * as controller from '../controllers/tweetController.js';
import Auth, {localVariables}  from "../middleware/auth.js";

const userRouter = Router();

/* POST request*/
userRouter.route('/createTweet').post(verifyUser, controller.createTweet);
userRouter.route('/tweets').get(verifyUser, controller.loadTweets);
userRouter.route('/deleteTweet').delete(verifyUser, controller.deleteTweet);
export default userRouter;