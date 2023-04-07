import React, { createContext, useState,useEffect } from 'react';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import client from '../config'
import jwt_decode from 'jwt-decode';



/** Make API Requests */

export async function checkLoginStatus(){
  const token = localStorage.getItem('token')
  if(!token) return false;
  console.log("logged in!");
  return true;
}

/** To get username from Token */
export async function getUsername(){
    const token = localStorage.getItem('token')
    if(!token) return Promise.reject("Cannot find Token");
    console.log(token);
    let decode = jwt_decode(token)
    console.log(decode.username);
    return decode.username;
}


/** register user function */
export async function registerUser(credentials){
    try {
        const { data : { msg }, status } = await client.post('/signup', credentials);

        let { username, email } = credentials;

        /** send email */
        /*if(status === 201){
            await axios.post('/api/registerMail', { username, userEmail : email, text : msg})
        }*/

        return Promise.resolve(msg)
    } catch (error) {
        return Promise.reject({ error })
    }
}

/** login function */
export async function verifyPassword({ username, password }){
    console.log("verifyPassword called: ", username, password)
    try {
        if(username){
            const { data } = await client.post('/login', { username, password })
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "Password doesn't Match...!"})
    }
}

/** update user profile function */
export async function updateUser(response){
    try {
        
        const token = await localStorage.getItem('token');
        const data = await client.put('/updateUser', response, { headers : { "Authorization" : `Bearer ${token}`}});

        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error : "Couldn't Update Profile...!"})
    }
}



/** update user tweets */
export async function updateTweet(response){
    try {
        
        const token = await localStorage.getItem('token');
        const data = await client.post('/tweet/createTweet', response, { headers : { "Authorization" : `Bearer ${token}`}});

        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error : "Couldn't Update Profile...!"})
    }
}

/** generate OTP */
//to be modified
export async function generateOTP(username){
    try {
        const {data : { code }, status } = await client.get('/generateOTP', { params : { username }});

        // send mail with the OTP
        if(status === 201){
            let { data : { email }} = await getUser({ username });
            let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
            await client.post('/api/registerMail', { username, userEmail: email, text, subject : "Password Recovery OTP"})
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error });
    }
}

/** verify OTP */
export async function verifyOTP({ username, code }){
    try {
       const { data, status } = await client.get('/verifyOTP', { params : { username, code }})
       return { data, status }
    } catch (error) {
        return Promise.reject(error);
    }
}

/** reset password */
export async function resetPassword({ username, password }){
    try {
        const { data, status } = await client.put('/resetPassword', { username, password });
        return Promise.resolve({ data, status})
    } catch (error) {
        return Promise.reject({ error })
    }
}