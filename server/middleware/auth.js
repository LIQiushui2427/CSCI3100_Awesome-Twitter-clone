import jwt from 'jsonwebtoken';
import ENV from '../config.js'


export function localVariables(req, res, next){
    req.app.locals = {
        OTP : null,
        resetSession : false
    }
    next()
}

export function protect(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send({ error });
    }
}