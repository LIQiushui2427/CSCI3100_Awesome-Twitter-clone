import {Router} from "express";
import * as controller from '../controllers/adminController.js';
import Auth, {checkAdmin}  from "../middleware/auth.js";

const adminRouter = Router();

//get/delete /api/admin/...
adminRouter.route('/listAllUsers').get(Auth,checkAdmin,controller.listAllUsers);
adminRouter.route('/deleteUser').delete(Auth,checkAdmin,controller.deleteUser);

export default adminRouter;