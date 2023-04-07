import Image from "next/image";
import { HomeIcon } from '@heroicons/react/solid';
import React from 'react';
import { Router, useRouter } from 'next/router';
import {useState} from 'react';
//import avatar from '../../public/default_avatar.png';
import nologinavatar from '../../public/no_login_avatar.png';
import {getUsername, checkLoginStatus} from '../../helper/helper';

import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import SidebarLink from "./SidebarLink";

const LeftPane = () => {
  const router = useRouter();
  const [isloggedin, setIsloggedin] = useState(false);
  const [username, setUsername] = useState("Login");
  //setIsloggedin(checkLoginStatus());
  //let isloggedin = false;
  //const isloggedin = checkLoginStatus();
  checkLoginStatus().then(res => setIsloggedin(res));
  getUsername().then(res=>setUsername(res));
  let avatar = require('../../public/default_avatar.png');
  let nologinavatar = require('../../public/no_login_avatar.png');
  //const {username} = getUsername();
  
  function userLogout(){
    localStorage.removeItem('token');
    window.location.href = "/";
  }

  /*if(isloggedin){
    {username} = getUsername();
  }*/


  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
      <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 512 512" className=" w-8 h-8">
              <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/>
          </svg>

      </div>
      <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
        <SidebarLink text="Home" Icon={HomeIcon} active />
        <SidebarLink text="Notifications" Icon={BellIcon} />
        <SidebarLink text="Messages" Icon={InboxIcon} />
        <SidebarLink text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarLink text="Lists" Icon={ClipboardListIcon} />
        <SidebarLink text="Profile" Icon={UserIcon} />
      </div>
      <button className="hidden xl:inline ml-auto bg-[#1d9bf0] text-white rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#1a8cd8]">
        Tweet
      </button>

      <div className="text-[#d9d9d9] flex mt-14 items-center justify-center hoverAnimation xl:ml-24 xl:-mr-0" >
        <img src={isloggedin? "https://picsum.photos/id/1005/40/40" : "https://www.w3schools.com/howto/img_avatar.png"} alt="User profile" className="w-8 h-8 rounded-full mr-2"/>
        {isloggedin?
          <div className="hidden xl:inline leading-5">
            <h2 className="font-bold cursor-pointer" onClick={() => router.push('/profile')}>{username}</h2>
            <p className="text-gray-600 cursor-pointer" onClick={userLogout}>logout</p>
          </div>:        
          <div className="hidden xl:inline leading-5">
            <h2 className="font-bold cursor-pointer" onClick={() => router.push('/login')}>Login</h2>
          </div>
        }
        <DotsHorizontalIcon className="h-5 hidden xl:inline ml-10" />

      </div>
    </div>
  );
};

export default LeftPane;