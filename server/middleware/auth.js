/*
    This file is for some useful functions of authenticating users.
*/
import jwt from "jsonwebtoken";
import ENV from "../config.js";
import User from "../model/User.model.js";

/*
    This function checks whether the user is logged in by verifying the token. If verified, the information
    of this user will be stored in req.user for further usage.
    (For the functions following this function, they can directly access req.user for user information.)
*/
export default async function Auth(req, res, next) {
  //check whether the header contains authorization information
  if (req.headers && req.headers.authorization) {
    /*
            Get the token.
            The token, as jwt tokens, are sent in the header via Authorization: Bearer <token>
        */
    const token = req.headers.authorization.split(" ")[1];
    try {
      //decode the token and check whether this user exists in the database
      const decode = jwt.verify(token, ENV.JWT_SECRET);
      const user = await User.findById(decode.userId);
      if (!user) {
        //user does not exist
        res.status(401).json({ error: "Authentication Failed!" });
      }
      //store the user information and perform the next steps
      req.user = user;
      console.log(req.user._id);
      next();
    } catch (error) {
      res.status(401).json({ error: "Authentication Failed!" });
    }
  } else {
    res.status(401).json({ error: "Authentication Failed!" });
  }
}

/*
    This function checks whether the user is an admin user. It should be called after Auth().
    Since user information is already stored, this function is rather straightforward.
*/
export async function checkAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ error: "Authentication Failed!" });
  }
}

/*
    This function provides some local variables for sending OTP.
*/
export function localVariables(req, res, next) {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
}
