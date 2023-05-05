import React, { useState, useEffect } from 'react';
import { Router, useRouter } from 'next/router';
import axios from '../../config.js';
import Navigate from "../Navigate";
import UserComponent from "./userComponent";
import { checkIsAdmin } from '../../helper/helper.js';
/*
  This is the admin page component, which will appear in the middle plane of the admin page.
*/
const AdminPage = () => {
  //list of users
  const [users, setUsers] = useState([]);
  //whether the accessing user is an admin
  const [isadmin, setIsadmin] = useState(false);
  const router = useRouter();
  //check if the user is an admin
  checkIsAdmin().then(res=>setIsadmin(res));
  
  useEffect(() => {
    //get the token for identifying the user
    const token = localStorage.getItem('token');
    
    if (!token) {
      // handle case where token is not found in localStorage
      return;
    }
    //send GET request to /admin/listAllUsers to get the list of users
    axios.get('/admin/listAllUsers', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        const users = Object.values(response.data.users);
        //set the value of users
        setUsers(users);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  /*
    The component is returned, in which:
    users are mapped to a list of UserComponents;
    if the current user is not an admin user and accesses this page intentionally or unintentionally,
    only "You do not have access to the admin page" is displayed on the page.
  */
  return(
    <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full justify-start items-stretch pb-10">
            <div className="px-5 pt-2">
                <Navigate title="Users List"/>
            </div>
            {isadmin?<div >
              {users.map((auser) => (
              <UserComponent key={auser.username} username={auser.username} admin={auser.isAdmin?"true":"false"} avatar={auser.profile || 'https://www.w3schools.com/howto/img_avatar.png'} />
              ))}
            </div>
            :
            <div className="p-6">
              You do not have access to the admin page.  
            </div>}
        </div>
    </div>
);
};

export default AdminPage;