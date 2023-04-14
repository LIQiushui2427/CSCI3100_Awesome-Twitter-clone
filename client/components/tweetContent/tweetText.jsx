import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from '../../config.js';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { sendRetweet,getUsername,checkLoginStatus,likeTweet,unlikeTweet} from '@/helper/helper.js';
import useFetch from '../../hooks/fetch.hook';

const Avatar = ({ src, alt }) => (
  <img
    className="h-16 w-16 rounded-full"
    src={src}
    alt={alt}
  />
);

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

const TweetText = ({ tweetId }) => {
  const [{ isLoading, apiData, serverError }] = useFetch();
  const [tweetData, setTweetData] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [currentUser,setCurrentUser] = useState();
  const [isloggedin, setIsloggedin] = useState(false);
  const [likednum,setLikednum] = useState();
  const [noop,setNoop] = useState(true);
  const router = useRouter();

  checkLoginStatus().then(res => setIsloggedin(res));
  getUsername().then(res => setCurrentUser(res));

  
  console.log('TweetText component invoked');
  useEffect(() => {
    const fetchTweetData = async () => {
      try {
        const response = await axios.get(`/tweet/getTweetById?tweetId=${tweetId}`);///tweet:tweetId
        const data = response.data;
        setTweetData(data);
        console.log("TweetText: tweetData: ", data);
        return data;
      } catch (error) {
        console.error(error);
      }
    };
    fetchTweetData();
    
  }, [tweetId]);
  if (!tweetData) {
    return <div>Loading tweet...</div>;
  }
  
  console.log("tweet loaded");
  

  const { nickname, username, content, profile,images, date, likes, retweets, isRetweet,retweetUser,originalTime,likedUsers } = tweetData;
  const authorid = username
  const authorname = nickname
  const time = (isRetweet?originalTime : date)
  const picture = images
  const nopic = (images === '' ? "true" : "false")
  //const [retweetnum,setRetweetnum] = useState(retweets);
  if(noop && tweetData.likedUsers.includes(currentUser) && !isLiked){
    setIsLiked(true);
  }
  if(noop && likednum != likes){
    setLikednum(likes);
  }
  
  console.log("tweet info loaded");
  const onComment = () => {
  };
  const onLike = () => {
    if(!isloggedin){
      alert("You need to login before liking!");
      router.push('/login');
      return;
    }
    if (isLiked){
      unlikeTweet({username:currentUser,tweetId:tweetId}).then(
        function(){
          setIsLiked(false);
          setLikednum(likednum - 1);
          setNoop(false);
      },function(){
        alert("Fail to unlike tweet!");
      });
    }
    else{
      likeTweet({username:currentUser,tweetId:tweetId}).then(
        function(){
          setIsLiked(true);
          setLikednum(likednum + 1);
          setNoop(false);
      },function(){
        alert("Fail to like tweet!");
      });
    }
    
  };
  

  const OnClickTweet = () => {
    console.log("TweetText: OnClickTweet: ", tweetId);
    router.push(`/tweet?tweetId=${tweetId}`);
  };

 
  
  const onRetweet = () => {
    if(!isloggedin){
      alert("You need to login before retweeting!");
      router.push('/login');
      return;
    }
    if(isRetweet){
      alert("Please retweet original tweet!");
      return;
    }
    sendRetweet({username:currentUser,tweetId:tweetId}).then(
      function(){
        //setRetweetnum(retweetnum + 1);
        alert("Successfully retweeted!");
    },function(){
      alert("Fail to retweet!");
    });
  };
  return (
    <div className="w-full">
      {isRetweet?<div className="text-gray-500 flex">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
          <path fill-rule="evenodd" d="M10 4.5c1.215 0 2.417.055 3.604.162a.68.68 0 01.615.597c.124 1.038.208 2.088.25 3.15l-1.689-1.69a.75.75 0 00-1.06 1.061l2.999 3a.75.75 0 001.06 0l3.001-3a.75.75 0 10-1.06-1.06l-1.748 1.747a41.31 41.31 0 00-.264-3.386 2.18 2.18 0 00-1.97-1.913 41.512 41.512 0 00-7.477 0 2.18 2.18 0 00-1.969 1.913 41.16 41.16 0 00-.16 1.61.75.75 0 101.495.12c.041-.52.093-1.038.154-1.552a.68.68 0 01.615-.597A40.012 40.012 0 0110 4.5zM5.281 9.22a.75.75 0 00-1.06 0l-3.001 3a.75.75 0 101.06 1.06l1.748-1.747c.042 1.141.13 2.27.264 3.386a2.18 2.18 0 001.97 1.913 41.533 41.533 0 007.477 0 2.18 2.18 0 001.969-1.913c.064-.534.117-1.071.16-1.61a.75.75 0 10-1.495-.12c-.041.52-.093 1.037-.154 1.552a.68.68 0 01-.615.597 40.013 40.013 0 01-7.208 0 .68.68 0 01-.615-.597 39.785 39.785 0 01-.25-3.15l1.689 1.69a.75.75 0 001.06-1.061l-2.999-3z" clip-rule="evenodd" />
        </svg>
          {retweetUser} Retweeted
      </div>:null}
      <div className="flex items-start p-4">
        <img
          src={profile || 'https://www.w3schools.com/howto/img_avatar.png'}
          alt=""
          className="h-11 w-11 rounded-full cursor-pointer"
        />
        <div className="ml-4">
          <div className="flex items-center">
            <span className="font-bold text-lg">{authorname}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-500">@{authorid}</span>
            <span className="text-gray-500 mx-2">&middot;</span>
            <span className="text-gray-500">{time}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start p-2 divide-y divide-gray-500">
        <button className="text-left text-lg " onClick={OnClickTweet}> {content} </button>
        <img className={"w-auto rounded-xl " + (nopic == "true" ? 'hidden' : '')} src={picture} alt="Sample Picture" />
        <div className="w-full text-gray-500 flex pt-2 pb-2 mt-2">
          <div className="text-gray-500 font-bold"> {retweets} Retweets </div>
          <div className="text-gray-500 font-bold pl-5"> {likednum} Likes</div>
        </div>
        <div className="pt-2 w-full justify-between flex items-center">
          <div className={"p-2 mr-3 hover:text-green-600 hover:bg-green-600/10 rounded-full items-center cursor-pointer"} onClick={onRetweet}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg></div>
          <div
            className={`p-2 mr-3 hover:text-pink-600 hover:bg-pink-600/10 rounded-full items-center cursor-pointer ${isLiked ? 'text-pink-600' : ''
              }`}
            onClick={onLike}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={isLiked ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke={isLiked ? 'none' : 'currentColor'}
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
};

TweetText.propTypes = {
  authorname: PropTypes.string.isRequired,
  authorid: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  nopic: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  likes: PropTypes.string.isRequired,
  retweets: PropTypes.string.isRequired,
  onLike: PropTypes.func.isRequired,
  onComment: PropTypes.func.isRequired,
  onRetweet: PropTypes.func.isRequired,
};

export default TweetText;