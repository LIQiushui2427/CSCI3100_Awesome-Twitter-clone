import {Router} from "express";
import * as controller from '../controllers/appController.js';
import { localVariables } from "../middleware/auth.js";

const router = Router();


/* POST request*/ 
router.route('/signup').post(controller.signup);
router.route('/login').post(controller.verifyUser, controller.login);

/* GET request*/ 
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP) 
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP)
router.route('/createResetSession').get(controller.createResetSession)

/* PUT request*/ 
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword);

router.route('/post
export default router;