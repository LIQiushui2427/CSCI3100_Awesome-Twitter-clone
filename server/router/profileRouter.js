import {Router} from "express";
import { verifyUser } from "../controllers/appController.js";

import * as controller from "../controllers/appController.js";

const profileRouter = Router();

profileRouter.route('/updateProfile').post(controller.updateUser);
profileRouter.route('/loadUserInfo').get(controller.getUser);

export default profileRouter;