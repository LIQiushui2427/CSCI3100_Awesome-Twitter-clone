import Layout from "../components/Layout";
import Navigate from "../components/Navigate";
import Cover from "../components/Cover";
import { useEffect, useState } from "react";
import LeftPane from "@/components/leftPane/leftPane";
import RightPane from "@/components/rightPane/rightPane";
import Button from "@/components/follow_button";
import FollowList from "./follow_list";
import { Router, useRouter } from 'next/router';
import React from 'react';


import EditProfile from "./edit_profile";


const user_default = {
  'avatar': 'https://inews.gtimg.com/newsapp_bt/0/12614599781/1000',
  'name': 'Carlos',
  'id': 'carlos',
  'signature': 'Work hard, play hard!'

};


function Profile({ user = user_default }) {

  const router = useRouter();


  const { isMyProfile } = router.query;

  const [showEditCard, setShowEditCard] = useState(false);

  const handleEditClick = () => {
    setShowEditCard(true);
  };

  const handleClose = () => {
    setShowEditCard(false);
  };




  return (
    <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto z=60">
      <LeftPane />
      <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[350px] z=40">
        <div className={showEditCard ? "opacity-50 " : "max-w-2xl mx-auto border-l border-r border-twitterBorder min-h-screen "}>
          <div className="flex">
            <div className="w-1/4">
            </div>
          </div>
          <div className="border-b border-twitterBorder pb-10">
            <div className="px-5 pt-2">
              <Navigate title={user.name} />
            </div>

            <Cover src="http://5b0988e595225.cdn.sohucs.com/images/20190724/d89126445d4e423298f44cf672890fbc.jpeg" />
            <div className="flex justify-between">
              <div className="ml-5 relative">
                <div className="absolute -top-14 border-4 rounded-full border-black overflow-hidden">
                  <div className="rounded-full overflow-hidden w-36">
                    <img src="https://inews.gtimg.com/newsapp_bt/0/12614599781/1000"></img>
                  </div>
                </div>
              </div>

              <div>
                {isMyProfile === 'true' ?
                  <div>
                    <div className="flex pt-4 item-center mr-5">
                      <button onClick={handleEditClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                        Edit Profile
                      </button>
                    </div>
                    {showEditCard && <EditProfile onClose={handleClose} />}
                  </div>
                  :
                  <div className="flex  pt-4 ">
                    <div className="p-2 mr-3 hover:bg-gray-800 rounded-full border-2 border-twitterBorder items-center cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                      </svg>
                    </div>
                    <div className="p-2 mr-3 hover:bg-gray-800 rounded-full border-2 border-twitterBorder items-center cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div className="pr-5">
                      <Button text="Follow" />
                    </div>
                  </div>
                }
              </div>


            </div>
            <div className="mt-12 px-7 ">
              <h1 className="pl-5 font-bold text-xl leading-5">{"Carlos"}</h1>
            </div>
            <div>
              <div className="text-gray-500 pl-5 pt-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                </svg>
                <div className="pl-2 ">
                  Joined March 2023
                </div>
              </div>
              <div className="text-gray-500 pl-5 pt-2 flex items-center">
                <button onClick={() => router.push('/follow_list?followxx=following')} >
                  <div>x following</div>
                </button>
                <button onClick={() => router.push('/follow_list?followxx=follower')} className="p-2">
                  <div>x follower</div>
                </button>
              </div>

            </div>
          </div>
          <div class="grid grid-cols-3  border-b border-twitterBorder">
            <div class="flex items-center justify-center text-lg hover:bg-gray-800 cursor-pointer pt-2 pb-2"><p class="text-center">Tweets</p></div>
            <div class="flex items-center justify-center text-lg hover:bg-gray-800 cursor-pointer"><p class="text-center">Replies</p></div>
            <div class="flex items-center justify-center text-lg hover:bg-gray-800 cursor-pointer"><p class="text-center">Likes</p></div>
          </div>
          <div className="flex">
            <div className="w-1/4">
            </div>
          </div>
        </div>
      </div>
      <RightPane />

    </main>
  );
}

export default Profile;