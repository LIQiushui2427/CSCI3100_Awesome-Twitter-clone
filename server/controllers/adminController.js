import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import ENV from '../config.js'
import UserModel from '../model/User.model.js'

export async function listAllUsers(req, res) {
  try {
    const users = await UserModel.find({}).sort({ isAdmin: -1 });
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteUser(req, res){
  const { username } = req.body;
  if (!username) {
      return res.status(400).json({errno:400, error: "username is required" });
  }
  try {
      const deluser = await UserModel.findOne({ username: username });
      if (!deluser) {
          return res.status(404).json({errorno:404, error: "Admin: User not found" });
      }
      if(deluser.isAdmin){
        return res.status(403).json({errorno:403,error:"Cannot delete admin user"});
      }
      await deluser.deleteOne();
      res.status(201).json({ message: "User deleted successfully" });
  } catch (error) {
      console.error(error);
      res.status(500).json({errno:500, error: "Internal Server Error" });
  }
}