
import React, { useState } from 'react';

function Button() {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    // do some other following stuff
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