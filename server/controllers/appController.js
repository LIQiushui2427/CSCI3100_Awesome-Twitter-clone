// Import necessary modules and files
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import ENV from '../config.js'
import otpGenerator from 'otp-generator'
import nodemailer from 'nodemailer'
import Mailgen from 'mailgen'
import UserModel from '../model/User.model.js'

// Middleware function to verify user
export async function verifyUser(req, res, next) {
  try {
    console.log("req.query: ", req.query)
    console.log("req.body: ", req.body)
    const { username } = req.method == "GET" ? req.query : req.body;
    // If the method is POST, req.body is used
    console.log("username in verify User: ", username)
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).send({ error: "verifyUser: Can't find User!" });
    }
    next();
  } catch (error) {
    return res.status(401).send({ error: "Authentication Error" });
  }
}

// Function to search for users
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

// Function to create a new user account
export async function signup(req, res) {
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

// This function handles the user login request
export async function login(req, res) {
  const { username, password } = req.body; // Destructuring username and password from the request body
  try {
    const user = await UserModel.findOne({ username }); // Finding the user in the database with the provided username
    if (!user) { // If no user found, send an error response
      return res.status(404).send({ error: "Username not Found" });
    }
    const passwordCheck = await bcrypt.compare(password, user.password); // Comparing the provided password with the hashed password of the user
    if (!passwordCheck) { // If the passwords don't match, send an error response
      return res.status(400).send({ error: "Password does not Match" });
    }
    // If the user is authenticated, generate a JWT token and add it to the user's tokens array in the database
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
    if (oldTokens.length) { // Filter out the tokens that are older than 24 hours
      oldTokens = oldTokens.filter(t => {
        const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
        if (timeDiff < 86400) {
          return t;
        }
      });
    }
    // Updating the user's tokens array with the new token
    await UserModel.findByIdAndUpdate(user._id, {
      tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
    });
    // Sending a success response with the JWT token and username
    return res.status(200).send({
      msg: "Login Successful...!",
      username: user.username,
      token,
    });

  } catch (error) { // If any error occurs, sending an error response
    return res.status(500).send({ error });
  }

}


// This function generates an OTP and sends it to the user's email address
export async function generateOTP(req, res) {
  const { username } = req.query;
  console.log(username)

  // Find the user with the given username
  const user = await UserModel.findOne({ username });
  try {
    if (!user) {
      return res.status(404).send({ error: "Username not Found" });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }

  // Generate a 6 digit OTP
  const OTP = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false
  });

  // Store the OTP in a local variable for verification
  req.app.locals.OTP = OTP;

  // Send the OTP to the user's email address
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

// This function verifies if the provided OTP matches the one generated earlier
export async function verifyOTP(req, res) {
  const { code } = req.query;
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    // If the OTP matches, reset the OTP and set a flag for successful verification
    req.app.locals.OTP = null;
    req.app.locals.resetSession = true;
    return res.status(201).send({ msg: "Verification successful!" });
  }
  return res.status(400).send({ error: "Invalid OTP" });
}

// This function creates a reset session for the user to reset their password
export async function createResetSession(req, res) {
  if (req.app.locals.resetSession) {
    // If the resetSession flag is set, return a success response
    return res.status(201).send({ flag: req.app.locals.resetSession });
  }
  // If the resetSession flag is not set, return an error response
  return res.status(440).send({ error: "Session expired!" });
}

// This function resets the user's password
export async function resetPassword(req, res) {
  try {
    // Check if the resetSession flag is set
    if (!req.app.locals.resetSession)
      return res.status(440).send({ error: "Session expired!" });

    const { username, password } = req.body;

    // Find the user with the given username
    const user = await UserModel.findOne({ username });

    if (!user) {
      // If the user is not found, return an error response
      return res.status(404).send({ error: "Username not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    await UserModel.updateOne(
      { username: user.username },
      { password: hashedPassword }
    );

    // Reset the resetSession flag
    req.app.locals.resetSession = false;
    return res.status(201).send
      ({ msg: "Record Updated...!" });
  } catch (error) {
    return res.status(500).send({ error: "Unable to update record" });
  }
}
// Get user data by username
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

// Update user data by user ID
export async function updateUser(req, res) {
  try {
    const userId = req.user._id;
    if (userId) {
      const body = req.body;

      await UserModel.updateOne({ _id: userId }, body);
      const user = await UserModel.findOne({ userId });
      const { password, ...userData } = user.toObject();
      return res.status(200).json(userData);
    } else {
      res.status(401).send({ msg: "Unauthorized access!" });
    }
  } catch (error) {
    res.status(401).send({ error });
  }
}

// Logout user
export async function logout(req, res) {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).send({ msg: "Authorization fail!" });
    }
    const tokens = req.user.tokens;
    // const newTokens = tokens.filter(t => t.token !== tokens);
    // await UserModel.findByIdAndUpdate(req.user._id,{tokens:newTokens});

    // Sign out user token
    const authHeader = req.headers.authorization;
    jwt.sign(authHeader, "", { expiresIn: 1 }, (logout, err) => {
      if (logout) {
        res.status(200).send({ msg: "Log out successfully!" });
      }
      else {
        res.status(404).send({ msg: "error" });
      }
    });
  }
}
