import { Router } from "express";
import * as controller from "../controllers/adminController.js";
import Auth, { checkAdmin } from "../middleware/auth.js";

const adminRouter = Router();

/*GET request for /api/admin/listAllUsers, login and admin user required*/
adminRouter
  .route("/listAllUsers")
  .get(Auth, checkAdmin, controller.listAllUsers);
/*DELETE request for /api/admin/deleteUser, login and admin user required*/
adminRouter
  .route("/deleteUser")
  .delete(Auth, checkAdmin, controller.deleteUser);

export default adminRouter;
