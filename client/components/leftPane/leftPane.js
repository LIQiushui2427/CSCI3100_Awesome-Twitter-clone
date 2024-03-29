import Image from "next/image";
import useFetch from '../../hooks/fetch.hook';
import { HomeIcon } from '@heroicons/react/solid';
import React from 'react';
import { Router, useRouter } from 'next/router';
import { useState } from 'react';
import { useMemo } from 'react';

//import avatar from '../../public/default_avatar.png';
import nologinavatar from '../../public/no_login_avatar.png';
import { getUsername, checkLoginStatus, checkIsAdmin } from '../../helper/helper';
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
  KeyIcon,
} from "@heroicons/react/outline";
import SidebarLink from "./SidebarLink";
import DevelopersList from "../developerlist.js"
// Define the LeftPane component
function LeftPane() {
  // Use the useFetch hook to fetch data from an API
  const [{ isLoading, apiData, serverError }] = useFetch();
  // Use the useRouter hook to access the Next.js router
  const router = useRouter();

  // Define state variables for whether the user is logged in, the user's username, and whether the user is an admin
  const [isloggedin, setIsloggedin] = useState(false);
  const [username, setUsername] = useState("Login");
  const [isadmin, setIsadmin] = useState(false);

  
  const developers = [
    {
      name: 'lqs',
      link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUIcmlja3JvbGw%3D',
      contact: 'yijian2427@gmail.com',
    },
    {
      name: 'Jane Smith',
      link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUIcmlja3JvbGw%3D',
      contact: 'jane@example.com',
    },
    // Add more developers as needed
  ];
  // Use the useMemo hook to check the user's login status and set the isloggedin state variable accordingly
  useMemo(() => {
    checkLoginStatus().then(res => setIsloggedin(res));
  }, []);

  // Use the useMemo hook to get the user's username and set the username state variable accordingly
  useMemo(() => {
    getUsername().then(res => setUsername(res));
  }, []);

  // Use the useMemo hook to check if the user is an admin and set the isadmin state variable accordingly
  useMemo(() => {
    checkIsAdmin().then(res => setIsadmin(res));
  }, []);

  // Define a function to handle user logout
  function userLogout() {
    // Remove the user's token from local storage
    localStorage.removeItem('token');
    // Redirect the user to the home page
    window.location.href = "/";
  }

  // Define a function to handle sidebar link clicks
  const handleClick = (destination) => {
    // If the user clicks the "Home" link, redirect them to the home page
    if (destination === "Home") {
      router.push(`/`);
    }
    // If the user clicks the "Profile" link, redirect them to their own profile page
    else if (destination === "Profile") {
      router.push(`/profile/${username}`);
    }
    // If the user clicks the "Admin" link and they are an admin, redirect them to the admin page
    else if (destination === "Admin") {
      router.push(`/admin`);
    }
    // If the user clicks any other link, redirect them to the corresponding page
    else {
      router.push(`/tobedone`);
    }
  }

  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[300px] p-2 fixed h-full">
      <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24" onClick={() => { router.push(`/`); }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 512 512" className=" w-8 h-8">
          <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
        </svg>

      </div>
      <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
        <SidebarLink text="Home" Icon={HomeIcon} onPush={handleClick} />
        {isloggedin ?
          <>
            <SidebarLink text="Notifications" Icon={BellIcon} onPush={handleClick} />
            <SidebarLink text="Messages" Icon={InboxIcon} onPush={handleClick} />
            <SidebarLink text="Bookmarks" Icon={BookmarkIcon} onPush={handleClick} />
            <SidebarLink text="Lists" Icon={ClipboardListIcon} onPush={handleClick} />
            <SidebarLink text="Profile" Icon={UserIcon} onPush={handleClick} />
            {isadmin ?
              <SidebarLink text="Admin" Icon={KeyIcon} onPush={handleClick} />
              : null}
          </>
          : null}
      </div>
      
      {isloggedin ?
        <div className="text-[#d9d9d9] flex items-center justify-center hoverAnimation xl:ml-24 pr-10 xl:-mr-2" >

          <img src={apiData?.profile || "https://www.w3schools.com/howto/img_avatar.png"} alt="User profile" className=" hidden xl:inline  w-12 h-12 rounded-full ml-4" />


          <div className="hidden xl:inline leading-5 flex">
            <div>
              <div className="text-xl font-bold cursor-pointer ml-2" onClick={() => router.push(`/profile/${username}`)}>
                {apiData?.Nickname || username}</div>
              <p className="text-gray-600 cursor-pointer ml-2" >@{username}</p>
            </div>
          </div>


          <button className='hidden xl:inline  relative w-6 h-6 ml-8 hover:text-red-500' onClick={userLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button> </div> :
        <button onClick={() => router.push('/login')} className="hidden mt-20 xl:inline xl:ml-24 ml-auto bg-[#1d9bf0] text-white rounded-full w-36 h-[52px] text-lg font-bold shadow-md hover:text-yellow-500 hover:bg-[#1a8cd8]">
          Login
        </button>
      }

      <div className="hidden xl:inline mt-10 ml-2">   
        <DevelopersList developers={developers} />
        </div>

    </div>
  );
};

export default LeftPane;
