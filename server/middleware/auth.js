import jwt from 'jsonwebtoken';
import ENV from '../config.js';
import User from '../model/User.model.js';

export default async function Auth(req, res, next){
    if (req.headers && req.headers.authorization){
        const token = req.headers.authorization.split(' ')[1];
        try{
            const decode = jwt.verify(token,ENV.JWT_SECRET);
            const user = await User.findById(decode.userId);
            if(!user){
                res.status(401).json({ error : "Authentication Failed!"})
            }
            req.user = user;
            console.log(req.user._id);
            next()
        } catch(error){
            res.status(401).json({ error : "Authentication Failed!"})
        }
    }
    else{
        res.status(401).json({ error : "Authentication Failed!"})
    }
}

export async function checkAdmin(req, res, next){
    if (req.user && req.user.isAdmin){
        next();
    }
    else{
        res.status(401).json({ error : "Authentication Failed!"})
    }
}

export function localVariables(req, res, next){
    req.app.locals = {
        OTP : null,
        resetSession : false
    }
    next()
}