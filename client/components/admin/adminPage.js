import React, { useState, useEffect } from 'react';
import { Router, useRouter } from 'next/router';
import axios from '../../config.js';
import Navigate from "../Navigate";
import UserComponent from "./userComponent";
import { checkIsAdmin } from '../../helper/helper.js';
const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [isadmin, setIsadmin] = useState(false);
  const router = useRouter();
  checkIsAdmin().then(res=>setIsadmin(res));

  useEffect(() => {
    
    /*if(!isadmin){
      alert("Only admin users can access admin page!");
     //router.push('/');
    }*/
    
    
    
    const token = localStorage.getItem('token');
    
    if (!token) {
      // handle case where token is not found in localStorage
      return;
    }
    axios.get('/admin/listAllUsers', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        const users = Object.values(response.data.users);
        setUsers(users);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
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