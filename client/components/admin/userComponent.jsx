import React from "react";
import { useState } from 'react';
import { Router, useRouter } from 'next/router';
import {deleteUser} from '../../helper/adminhelper';

const UserComponent = ({username,avatar,admin = "false"}) => {
  const router = useRouter();
  const [deleted,setDeleted] = useState(false);
  function clickDelete(){
    let r = confirm("Are you sure you want to delete user "+username+"?");
    if(r == true){
        deleteUser(username).then(function(){
          alert("Successfully deleted user "+username+".");
        },function(){
          alert("Fail to delete user!");
        });
        //router.push('/admin')
        setDeleted(true);
    }
  }
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