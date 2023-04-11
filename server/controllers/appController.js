import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import ENV from '../config.js'
import otpGenerator from 'otp-generator'
import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import UserModel from '../model/User.model.js'

export async function verifyUser(req, res, next){
    try {
        console.log("req.query: ", req.query)
        console.log("req.body: ", req.body)
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
export async function searchUsers(req, res) {
    try {
      const { key } = req.query;
      if (!key) {
        return res.status(400).send({ error: "Keyword is required" });
      }
  
      const users = await UserModel.find({ username: { $regex: key, $options: "i" } });
      if (users.length === 0) {
        return res.status(404).send({ error: "No users found for the keyword" });
      }
  
      res.status(200).send({ users });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
  
export async function signup(req,res){
    try {
        const { username, password, email } = req.body;        

        // Check if the username and email already exist
        const existUsername = UserModel.findOne({ username });
        const existEmail = UserModel.findOne({ email });
        const [usernameExists, emailExists] = await Promise.all([existUsername, existEmail]);

        if (usernameExists) {
            return res.status(400).json({ error: "The username has been used" });
        }

        if (emailExists) {
            return res.status(400).json({ error: "The email has been used" });
        }

        // Encrypt the password
        if (!password) {
            return res.status(400).json({ error: "Password is required" });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const newUser = new UserModel({ username, password: encryptedPassword, email });
        await newUser.save();

        res.status(201).json({ msg: "User Signup Successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
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
          username: user.username,
          isAdmin: user.isAdmin
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

export async function generateOTP(req, res) {
    const { username } = req.query;
    console.log(username)
    const user = await UserModel.findOne({ username });
    try {
        if (!user) {
          return res.status(404).send({ error: "Username not Found" });
        }
    
    } catch (error) {
        return res.status(500).send({ error });
    }
      
    const OTP = otpGenerator.generate(6, { 
        lowerCaseAlphabets: false, 
        upperCaseAlphabets: false, 
        specialChars: false
    });
    req.app.locals.OTP = OTP;
    res.status(201).send({ code: OTP });
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: ENV.EMAIL,
            pass: ENV.PASSWORD
        }
    });
    const mailOptions = {
        from: ENV.EMAIL,
        to: user.email,
        subject: "Your OTP for Login",
        text: `Your OTP for login is ${OTP}.`
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${user.email}`);
        return OTP;
    } catch (error) {
        console.error(`Error sending OTP to ${user.email}: ${error}`);
        return null;
    }
}
  
export async function verifyOTP(req, res) {
    const { code } = req.query;
    if (parseInt(req.app.locals.OTP) === parseInt(code)) {
        req.app.locals.OTP = null;
        req.app.locals.resetSession = true;
        return res.status(201).send({ msg: "Verification successful!" });
    }
    return res.status(400).send({ error: "Invalid OTP" });
}

export async function createResetSession(req, res) {
    if (req.app.locals.resetSession) {
        return res.status(201).send({ flag: req.app.locals.resetSession });
    }
    return res.status(440).send({ error: "Session expired!" });
}

export async function resetPassword(req, res) {
    try {
        if(!req.app.locals.resetSession) 
            return res.status(440).send({error : "Session expired!"});

        const { username, password } = req.body;

        const user = await UserModel.findOne({ username });

        if (!user) {
        return res.status(404).send({ error: "Username not found" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await UserModel.updateOne(
        { username: user.username },
        { password: hashedPassword }
        );

        req.app.locals.resetSession = false;
        return res.status(201).send({ msg: "Record Updated...!" });
    } catch (error) {
        return res.status(500).send({ error: "Unable to update record" });
    }
}

export async function getUser(req, res) {
    try {
      const { username } = req.params;
    console.log("getUser: ", username);
      if (!username) {
        return res.status(400).json({ error: "Invalid username" });
      }
  
      const user = await UserModel.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ error: "Get user: User not found" });
      }
  
      const { password, ...userData } = user.toObject();
  
      return res.status(200).json(userData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  }

export async function updateUser(req,res){
    try{
        const userId = req.user._id;
        console.log(userId);
        if(userId){
            const body = req.body;
            //console.log(email);
            await UserModel.updateOne({_id:userId},body,function(err,data){
                if(err) throw err;
                return res.status(201).send({msg:"Record Updated...!"});
            })
        }
        else{
            return res.status(401).send({msg:"Unauthorized access!"});
        }
    }catch(error){
        return res.status(401).send({error});
    }
}

export async function logout(req,res){
    if(req.headers && req.headers.authorization){
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(401).send({msg:"Authorization fail!"});
        }
        const tokens = req.user.tokens;
        //const newTokens = tokens.filter(t => t.token !== tokens);
        //await UserModel.findByIdAndUpdate(req.user._id,{tokens:newTokens});
        const authHeader = req.headers.authorization;
        jwt.sign(authHeader,"",{ expiresIn: 1 },(logout,err) => {
            if(logout){
                res.status(200).send({msg:"Log out successfully!"});
            }
            else{
                res.status(404).send({msg:"error"});
            }
        });
        
    }
}