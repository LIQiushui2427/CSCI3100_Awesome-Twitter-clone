import Layout from "../components/Layout";
import Navigate from "../components/Navigate";
import Cover from "../components/Cover";
import { useEffect, useState } from "react";
import LeftPane from "@/components/leftPane/leftPane";
import RightPane from "@/components/rightPane/rightPane";
import Button from "@/components/follow_button";
import { Router, useRouter } from 'next/router';


import UserRow from "@/components/userRow";


const followers_default = [{
  'avatar': 'https://inews.gtimg.com/newsapp_bt/0/12614599781/1000',
  'name': 'Carlos1',
  'id': 'carlos',
  'signature': 'Work hard, play hard!'

}];

const followings_default = [{
  'avatar': 'https://randomuser.me/api/portraits/men/2.jpg',
  'name': 'Barlos',
  'id': 'barlos',
  'signature': 'Work hard, work hard!'
},
{
  'avatar': 'https://inews.gtimg.com/newsapp_bt/0/12614599781/1000',
  'name': 'Carlos2',
  'id': 'carlos',
  'signature': 'Work hard, play hard!'

}];




function FollowList({ followers = followers_default, followings = followings_default }) {

  const router = useRouter();
  const { followxx } = router.query;


  const [activeTab, setActiveTab] = useState(followxx);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


  return (
    <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">

      <LeftPane />
      <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[350px]">
        <div className="border-b border-twitterBorder">
          <div className="px-5 pt-2">
            <Navigate title={"Carlosssss"} />
          </div>
          <div>
            {activeTab === 'following' ? (
              <div>
                <div class="grid grid-cols-2  border-b border-twitterBorder">
                  <div class="flex items-center justify-center text-lg text-gray-500 hover:bg-gray-800 cursor-pointer pt-2 pb-2" onClick={() => handleTabClick('followers')}><p class="text-center" >Followers</p></div>
                  <div class="flex items-center justify-center text-lg text-white hover:bg-gray-800 cursor-pointer"><p class="text-center" >Following</p></div>
                </div>
                <div>
                  {followings.map((following) => (
                    <div key={following.id}>
                      <UserRow user={following} />
                    </div>
                  ))}
                </div>
              </div>

            ) : (
              <div>
                <div class="grid grid-cols-2  border-b border-twitterBorder">
                  <div class="flex items-center justify-center text-lg text-white hover:bg-gray-800 cursor-pointer pt-2 pb-2"><p class="text-center">Followers</p></div>
                  <div class="flex items-center justify-center text-lg text-gray-500 hover:bg-gray-800 cursor-pointer" onClick={() => handleTabClick('following')}><p class="text-center">Following</p></div>
                </div>
                <div>
                  {followers.map((follower) => (
                    <div key={follower.id}>
                      <UserRow user={follower} />
                    </div>
                  ))}
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
      <RightPane />

    </main>
  );
}

export default FollowList;




/*

import mongoose from 'mongoose';
import { useState, useEffect } from 'react';


function UserFollow({ type,hostUserId }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const currentUser = await User.findOne({ userId:{hostUserId} });
      const usersToDisplay = type === 'following'
        ? await User.find({ followers: currentUser.userId })
        : await User.find({ following: currentUser.userId });
      setUsers(usersToDisplay);
    }
    fetchUsers();
  }, [type]);

  return (
    <>
      <h1>{type === 'following' ? 'Followed by' : 'Following'}:</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <h2>{user.username}</h2>
            <p>{user.name}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
*/