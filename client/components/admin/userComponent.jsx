import React from "react";
import { useState } from 'react';
import { Router, useRouter } from 'next/router';
import {deleteUser} from '../../helper/adminhelper';

/*
  This is the user component, which lists the information of a user as well as a delete button.
  Parameters "username", "avatar", "admin" are required to display a user.
*/
const UserComponent = ({username,avatar,admin = "false"}) => {
  //use router to redirect to profile page
  const router = useRouter();
  //whether the user is deleted
  const [deleted,setDeleted] = useState(false);
  /*
    This function is invoked when the delete button is clicked. It will send the request to delete the
    corresponding user.
  */
  function clickDelete(){
    //since delete user is a "big" operation, a confirm dialog is invoked
    let r = confirm("Are you sure you want to delete user "+username+"?");
    if(r == true){
        //delete the corresponding user
        deleteUser(username).then(function(){
          alert("Successfully deleted user "+username+".");
        },function(){
          alert("Fail to delete user!");
        });
        //set the status of this user as deleted
        setDeleted(true);
    }
  }
  /*
    The component is returned, in which:
    if the user is an admin user, its username is displayed as yellow plus a "(admin)" notation
    otherwise its username is displayed as white;
    if the current user is deleted, this component is set to empty in order to dynamically show the
    delete results.
  */
  return (
    <div className="rounded-lg shadow-md p-6">
      <ul>
        {deleted?null:
          <li className="flex items-center xl:justify-start space-x-3">
            <img
              className="w-10 h-10 rounded-full"
              src={avatar}
              alt={username}
            />
            
              <h3 className={`font-bold w-full ${admin=="true"?"text-yellow-200":"text-white"} text-xl`}>{username}{admin=="true"?" (admin)":""}</h3>
              <button className="px-4 py-2 full-rounded rounded-lg bg-gray-200 text-gray-800" onClick={() => router.push('/profile')}>
                Profile
              </button>
              {admin=="true"?null:
              <button className="px-4 py-2 full-rounded rounded-lg bg-gray-200 text-gray-800" onClick={clickDelete}>
                Delete
              </button>}
            
        </li>}
      </ul>
      </div>
  );
};

export default UserComponent;