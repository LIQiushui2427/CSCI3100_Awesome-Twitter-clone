import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from "../config.js";
import UserModel from "../model/User.model.js";

/*
  This function will return all users in the database.
*/
export async function listAllUsers(req, res) {
  try {
    const users = await UserModel.find({}).sort({ isAdmin: -1 });
    //sort by the descending order of isAdmin ensures all admin users are listed before normal users.
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

/*
  This function will delete a user specified by a username from the database.
*/
export async function deleteUser(req, res) {
  const { username } = req.body;
  if (!username) {
    //no username is specified in the request
    return res.status(400).json({ errno: 400, error: "username is required" });
  }
  try {
    //find the user in the database first
    const deluser = await UserModel.findOne({ username: username });
    if (!deluser) {
      //cannot find user
      return res
        .status(404)
        .json({ errorno: 404, error: "Admin: User not found" });
    }
    if (deluser.isAdmin) {
      //the user found is an admin user
      return res
        .status(403)
        .json({ errorno: 403, error: "Cannot delete admin user" });
    }
    await deluser.deleteOne();
    res.status(201).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errno: 500, error: "Internal Server Error" });
  }
}
