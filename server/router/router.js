import { Router } from "express";
import * as controller from "../controllers/appController.js";
import Auth, { localVariables } from "../middleware/auth.js";

const router = Router();

/*POST request for /api/signup*/
router.route("/signup").post(controller.signup);
/*POST request for /api/login*/
router.route("/login").post(controller.verifyUser, controller.login);
/*POST request for /api/logout, login required*/
router.route("/logout").post(Auth, controller.logout);

/*GET request for /api/user/:username*/
router.route("/user/:username").get(controller.getUser); //modified, any frontend used this should be changed
/*GET request for /api/generateOTP*/
router
  .route("/generateOTP")
  .get(controller.verifyUser, localVariables, controller.generateOTP);
/*GET request for /api/verifyOTP*/
router.route("/verifyOTP").get(controller.verifyUser, controller.verifyOTP);
/*GET request for /api/createResetSession*/
router.route("/createResetSession").get(controller.createResetSession);
/*GET request for /api/searchUsers*/
router.route("/searchUsers").get(controller.searchUsers);

/*PUT request for /api/resetPassword*/
router
  .route("/resetPassword")
  .put(controller.verifyUser, controller.resetPassword);
/*PUT request for /api/updateUser, login required*/
router.route("/updateUser").put(Auth, controller.updateUser);

export default router;
