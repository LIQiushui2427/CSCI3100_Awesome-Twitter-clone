import jwt from 'jsonwebtoken';
import ENV from '../config.js'


export function localVariables(req, res, next){
    req.app.locals = {
        OTP : null,
        resetSession : false
    }
    next()
}