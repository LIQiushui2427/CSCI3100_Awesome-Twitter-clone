// Import necessary components and libraries
import Navigate from "../../components/Navigate";
import Cover from "../../components/Cover";
import Avatar from "../../components/Avatar";
import { useEffect, useState } from "react";
import LeftPane from "@/components/leftPane/leftPane";
import RightPane from "@/components/rightPane/rightPane";
import { getUsername, checkLoginStatus, checkIsAdmin } from '../../helper/helper';
import { Router, useRouter } from 'next/router';
import React from 'react';
import useFetch from '../../hooks/fetch.hook';
import convertToBase64 from '../../helper/convert';
import UserList from '../../components/userlist';
import TweetList from '../../components/tweetlist';
/*
This component is used to display the user's profile page.
It import and use many components, including the navigate component, the cover component, the avatar component,
the left pane component, the right pane component, the userlist component and the tweetlist component.
*/
// Define the Profile component
function Profile() {
  // Get the router object and the "username" parameter from the query
  const router = useRouter();
  const { username } = router.query;

  // Define the component state variables
  const [editMode, setEditMode] = useState(false);
  const [cover, setCover] = useState("");
  const [{ isLoading, apiData, serverError }] = useFetch(router.query);
  const [biography, setbiography] = useState(null);
  const [Nickname, setNickname] = useState(null);
  const [profile, setProfile] = useState(null);
  const [oribiobiography, setOribiobiography] = useState(null);
  const [oriname, setOriname] = useState(null);
  const [oriprofile, setOriprofile] = useState(null);
  const [displayMode, setDisplayMode] = useState(0);
  const [isMyProfile, setIsMyProfile] = useState(false);

  // Define a function to update the user's cover or profile image
  function updateUserImage(tmp_type, src) {
    if (tmp_type === "cover") {
      setCover(src);
    } else {
      setProfile(src);
    }
  }

  // Define a function to check if the current user is viewing their own profile
  async function check() {
    let loggedinusername = await getUsername();
    console.log("loggedinusername", loggedinusername);
    setIsMyProfile(loggedinusername === apiData?.username);
  }

  // Define a function to update the user's profile information
  async function updateProfile() {
    let values = {};
    values = await Object.assign(values, {
      Nickname: Nickname || "",
      biography: biography || "",
    });
    let updatePromise = updateUser(values);
    updatePromise.then((res) => { });
    setOribiobiography(biography);
    setOriname(Nickname);
    setEditMode(false);
  }

  // Define a function to cancel the user's edits to their profile information
  function cancel() {
    setbiography(oribiobiography);
    setNickname(oriname);
    setEditMode(false);
  }

  // Check if the user is viewing their own profile on component mount
  useEffect(() => {
    async function check() {
      let loggedinusername = await getUsername();
      console.log("loggedinusername", loggedinusername);
      setIsMyProfile(loggedinusername === apiData?.username);
    }
    check();
  }, [apiData]);

  return (
    <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto z=60">
      <LeftPane />
      <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[350px] z=40">
        <div className={"max-w-2xl mx-auto border-l border-r border-twitterBorder min-h-screen "}>
          <div className="flex">
            <div className="w-1/4">
            </div>
          </div>
          <div className="border-b border-twitterBorder pb-10">
            <div className="px-5 pt-2">
              <Navigate title={Nickname || apiData?.Nickname || username} />
            </div>
            <Cover src={cover || apiData?.cover || "https://cdn.discordapp.com/attachments/1089880136037437460/1095383978967564318/cHl.jpg"}
              editable={isMyProfile}
              onChange={src => updateUserImage('cover', src)}
            />
            <div className="flex justify-between">
              <div className="ml-5 relative">
                <div className="absolute -top-20 border-4 rounded-full border-black overflow-hidden">
                  <div className="rounded-full overflow-hidden w-36 h-36">
                    <Avatar src={profile || apiData?.profile || "https://www.w3schools.com/howto/img_avatar.png"}
                      editable={isMyProfile}
                      onChange={src => updateUserImage('profile', src)} />
                  </div>
                </div>
              </div>

              <div>

                <div className="flex  pt-20 ">
                  <p className="text-white text-xl font-bold"></p>
                </div>

              </div>

            </div>
            {!editMode && (
              <div>
                <div className="mt-5 px-7 ">
                  <h1 className="pl-6 pb-3 font-bold text-xl leading-5">{Nickname || apiData?.Nickname || username}</h1>
                </div>
                <div>
                  <h1 className="pl-14 pb-2 text-sm text-gray-500 leading-5">@{username}</h1>
                </div>
              </div>)
            }
            {editMode && (
              <div>
                <input type="text" value={Nickname}
                  onChange={ev => setNickname(ev.target.value)}
                  className="bg-twitterBorder p-2 mb-2 rounded-full" />
              </div>
            )}
            <div>
              {!editMode && (<div className="text-gray-500 pl-5  flex items-center pb-3">
                <div>
                  {biography || apiData?.biography || "good good study, day day up"}
                </div>
              </div>)}

              {editMode && (
                <div>
                  <textarea value={biography}
                    onChange={ev => setbiography(ev.target.value)}
                    placeholder="Write your biography here!"
                    className="bg-twitterBorder p-2 mb-2 rounded-2xl w-full block" />
                </div>
              )}

              <div className="text-white pl-5 ml-5 pt-2 flex items-center">
                <button onClick={() => setDisplayMode(1)} className="pl-4">
                  <div className="hover:underline">follower</div>
                </button>
                <button onClick={() => setDisplayMode(2)} className="pl-4">
                  <div className="hover:underline">following</div>
                </button>

              </div>

            </div>
          </div>
          {displayMode === 0 && (
            <div>
              <h3>Tweets</h3>
              <ul>
                <TweetList authorname={username} />
              </ul>
            </div>
          )}
          {displayMode === 1 && (
            <div>
              <h3>Followers</h3>
              <ul>
                <UserList follower={username} />
              </ul>
            </div>
          )}
          {displayMode === 2 && (
            <div>
              <h3>Following</h3>
              <ul>
                <UserList following={username} />
              </ul>
            </div>
          )}
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