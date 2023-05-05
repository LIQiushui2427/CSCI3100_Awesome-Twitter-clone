import {Router} from "express";
import * as userController from '../controllers/userController.js';
import * as controller from '../controllers/appController.js';
/*
Profile Router will handle all the requests for /api/user
*/
const userRouter = Router();

userRouter.route('/follow').post(controller.verifyUser, userController.follow);
userRouter.route('/unfollow').post(controller.verifyUser, userController.unfollow);
userRouter.route('/getFollowers').get(controller.verifyUser, userController.getFollowers);
userRouter.route('/getFollowing').get(controller.verifyUser, userController.getFollowing);
userRouter.route('/getFollowersCount').get(controller.verifyUser, userController.getFollowersCount);
userRouter.route('/getFollowingCount').get(controller.verifyUser, userController.getFollowingCount);

export default userRouter;