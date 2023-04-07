import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import ENV from '../config.js'
import otpGenerator from 'otp-generator'
import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import UserModel from '../model/User.model.js'

export async function verifyUser(req, res, next){
    try {

        const { username } = req.method == "GET" ? req.query : req.body;

        const user = await UserModel.findOne({ username });
        if(!user) {
            return res.status(404).send({ error : "verifyUser: Can't find User!"});
        }
        next();

    } catch (error) {
        return res.status(401).send({ error: "Authentication Error"});
    }
}



export async function login(req, res) {
    const { username, password } = req.body;
    console.log(req.body);
    try {
      const user = await UserModel.findOne({ username });
      if (!user) {
        return res.status(404).send({ error: "Username not Found" });
      }
  
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck) {
        return res.status(400).send({ error: "Password does not Match" });
      }
  
      const token = jwt.sign(
        {
          userId: user._id,
          username: user.username
        },
        ENV.JWT_SECRET,
        { expiresIn: "24h" }
      );
      let oldTokens = user.tokens || [];
      if(oldTokens.length){
        oldTokens = oldTokens.filter(t => {
            const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
            if(timeDiff < 86400){
                return t;
            }
        });
      }
      await UserModel.findByIdAndUpdate(user._id, {
        tokens: [...oldTokens,{token,signedAt: Date.now().toString()}],
      });
      return res.status(200).send({
        msg: "Login Successful...!",
        username: user.username,
        token,
      });

    } catch (error) {
      return res.status(500).send({ error });
    }
    
}

