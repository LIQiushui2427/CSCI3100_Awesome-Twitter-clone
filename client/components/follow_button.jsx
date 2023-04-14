import React, { useState, useEffect } from 'react';
import { follow, unfollow } from '@/helper/helper';

function Button({hostname, guestname, isfollowing}) {
  const [isActive, setIsActive] = useState(isfollowing??false);
  

  console.log('follow_button component invoked');


  const handleClick = () => {
    if(isActive){
      unfollow({follower:hostname, followee:guestname}).then(
        function(){
          setIsActive(!isActive);
        },
        
        function(){
          alert("Fail to unfollow this user!");
        }
      )
    }
    else{
      follow({follower:hostname, followee:guestname}).then(
        function(){
          setIsActive(!isActive);
        },
        
        function(){
          alert("Fail to follow this user!");
        }
      )
    }
  };

  return (
    <button
      className={`px-4 py-2 full-rounded rounded-lg ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
      onClick={handleClick}
    >
      {isActive ? 'Followed' : 'Follow'}
    </button>
  );
}

export default Button;

/*

import React, { useState } from 'react';
import axios from 'axios';

function Button() {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    async function checkFollowing() {
      const response = await axios.get(`/api/user/following/${userId}`);
      setIsFollowing(response.data.isFollowing);
    }
  
    checkFollowing();
  }, [userId]);

  async function toggleFollow() {
    const response = await axios.put(`/api/user/following/${userId}`);
    setIsFollowing(response.data.isFollowing);
  }
  

  return (
    <button
      className={`px-4 py-2 full-rounded rounded-lg ${isFollowing ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
      onClick={toggleFollow}
    >
      {isFollowing ? 'Followed' : 'Follow'}
    </button>
  );
}

export default Button;

*/