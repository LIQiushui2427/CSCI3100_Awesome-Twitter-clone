import {Router} from "express";
import { verifyUser } from "../controllers/appController.js";
/*
Profile Router will handle all the requests for /api/profile
*/
import * as controller from "../controllers/appController.js";

const profileRouter = Router();

profileRouter.route('/updateProfile').post(controller.updateUser);
profileRouter.route('/loadUserInfo').get(controller.getUser);

export default profileRouter;