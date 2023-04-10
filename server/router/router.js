import {Router} from "express";
import * as controller from '../controllers/appController.js';
import Auth, {localVariables}  from "../middleware/auth.js";

const router = Router();


/* POST request*/ 
router.route('/signup').post(controller.signup);
router.route('/login').post(controller.verifyUser, controller.login);
router.route('/logout').post(Auth, controller.logout);

/* GET request*/ 
router.route('/user/:username').get(controller.getUser)
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP) 
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP)
router.route('/createResetSession').get(controller.createResetSession)
router.route("/searchUsers").get(controller.searchUsers);
/* PUT request*/ 
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword);
router.route('/updateUser').put(Auth, controller.updateUser);

export default router;