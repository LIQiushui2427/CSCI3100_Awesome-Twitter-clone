import toast from 'react-hot-toast'
//import { authenticate } from './helper'

/** validate login page username */
export async function usernameValidate(values){
    const errors = usernameVerify({}, values);

    return errors;
}

/** validate password */
export async function passwordValidate(values){
    const errors = passwordVerify({}, values);

    return errors;
}

/** validate reset password */
export async function resetPasswordValidation(values){
    const errors = passwordVerify({}, values);

    if(values.password !== values.password2){
        errors.exist = toast.error("Password not match...!");
    }

    return errors;
}

/** validate register form */
export async function registerValidation(values){
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);

    return errors;
}

/** validate login form */
export async function loginValidation(values){
    const errors = usernameVerify({}, values);
    return errors;
}

/** validate sendOTP form */
export async function sendOTPValidation(values){
    console.log(values)
    const errors = usernameVerify({}, values);
    return errors;
}

/** validate profile page */
export async function profileValidation(values){
    const errors = emailVerify({}, values);
    return errors;
}


/** ************************************************* */

/*
    This function checks if a password satisfy the requirements:
    password cannot include space;
    password must be at least 6 characters long.
*/
function passwordVerify(errors = {}, values){
    /* eslint-disable no-useless-escape */

    if(!values.password){
        errors.password = toast.error("Password Required...!");
    } else if(values.password.includes(" ")){
        errors.password = toast.error("Wrong Password...!");
    }else if(values.password.length < 6){
        errors.password = toast.error("Password must be more than 6 characters long");
    }

    return errors;
}



/*
    This function checks if a username satisfy the requirement:
    username cannot include space.
*/
function usernameVerify(error = {}, values){
    if(!values.username){
        error.username = toast.error('Username Required...!');
    }else if(values.username.includes(" ")){
        error.username = toast.error('Invalid Username...!')
    }

    return error;
}

/*
    This function checks if an email satisfy the requirement:
    email cannot include space;
    email must be in the form of <some string>@<some string>.<an alphabet word of length 2-4> .
*/
function emailVerify(error ={}, values){
    if(!values.email){
        error.email = toast.error("Email Required...!");
    }else if(values.email.includes(" ")){
        error.email = toast.error("Wrong Email...!")
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Invalid email address...!")
    }

    return error;
}