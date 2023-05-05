import React, { createContext, useState,useEffect } from 'react';
import client from '../config'
import jwt_decode from 'jwt-decode';

/*
    This function checks whether the user is logged in by simply checking whether the token exists.
    It does not involve backend so it is more efficient.
*/
export async function checkLoginStatus(){
  const token = localStorage.getItem('token')
  if(!token) return false;
  return true;
}

/*
    This function gets the username by decoding the token.
    It does not involve backend so it is more efficient.
*/
export async function getUsername(){
    const token = localStorage.getItem('token')
    if(!token) return Promise.reject("Cannot find Token");
    //console.log(token);
    let decode = jwt_decode(token)
    console.log(decode.username);
    return decode.username;
}

/*
    This function checks if a user is an admin by decoding the token.
    It does not involve backend so it is more efficient.
*/
export async function checkIsAdmin(){
    const token = localStorage.getItem('token')
    if(!token) return Promise.reject("Cannot find Token");
    let decode = jwt_decode(token)
    return decode.isAdmin;
}


/*
    This function sends a POST request to /signup to register users.
*/
export async function registerUser(credentials){
    try {
        const { data : { msg }, status } = await client.post('/signup', credentials);

        let { username, email } = credentials;

        return Promise.resolve(msg)
    } catch (error) {
        return Promise.reject({ error })
    }
}

/*
    This function sends a POST request to /login to verify the password thus login.
*/
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

/*
    This function sends a PUT request to /updateUser to update the information of the user.
    The request is sent with proper token included.
*/
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

/*
    This function sends a POST request to /tweet/reTweet to post a retweet.
    The request is sent with proper token included.
*/
export async function sendRetweet(response){
    try {
        
        const token = await localStorage.getItem('token');
        const data = await client.post('/tweet/reTweet', response, { headers : { "Authorization" : `Bearer ${token}`}});

        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error : "Couldn't Retweet!"})
    }
}

/** generate OTP */
//to be modified
export async function generateOTP(username){
    try {
        const { data: { code }, status } = await client.get(`/generateOTP?username=${username.username}`);
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error });
    }
}

/** verify OTP */
export async function verifyOTP({ username, code }){
    try {
        console.log(code)
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

/*
    This function sends a POST request to /tweet/likeTweet to perform like operation on a tweet.
    The request is sent with proper token included.
*/
export async function likeTweet(response){
    try {
        
        const token = await localStorage.getItem('token');
        const data = await client.post('/tweet/likeTweet', response, { headers : { "Authorization" : `Bearer ${token}`}});

        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error : "Couldn't like tweet!"})
    }
}

/*
    This function sends a POST request to /tweet/likeTweet to perform unlike operation on a tweet.
    The request is sent with proper token included.
*/
export async function unlikeTweet(response){
    try {
        
        const token = await localStorage.getItem('token');
        const data = await client.post('/tweet/unlikeTweet', response, { headers : { "Authorization" : `Bearer ${token}`}});

        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error : "Couldn't unlike tweet!"})
    }
}