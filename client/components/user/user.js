import React, { useEffect, useState } from "react";
import { Router, useRouter } from 'next/router';


const Button = ({ isFollowed, handleFollow }) => {
  const buttonText = isFollowed ? 'Unfollow' : 'Follow';

  return (
    <button
      className={`px-4 py-2 full-rounded rounded-lg ${isFollowed ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
      onClick={handleFollow}
    >
      {buttonText}
    </button>
  );
}

const User = ({ userId, currentUser }) => {
  console.log(typeof userId);
  const router = useRouter()
  const [user, setUser] = useState(null);
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:8080/api/user/${userId}`);
      const data = await response.json();
      setUser(data);
      setIsFollowed(data.followers.includes(currentUser));
    }
    fetchData();
  }, [userId, currentUser]);

  const handleFollow = async () => {
    const response = await fetch(`http://localhost:8080/api/user_f/${isFollowed ? "unfollow" : "follow"}?username=${currentUser}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ followee: user.username, follower: currentUser, username : currentUser }),
    });
    if (response.ok) {
      setIsFollowed(!isFollowed);
    } else {
      console.error("Failed to follow/unfollow user.");
    }
  };
  

  if (!user) {
    return <p>Loading user...</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-0">
      <div className="container col-span-2 ml-auto mx-auto pt-3 pl-5 ">
        <ul>
          <li key={user.username} className="flex items-center py-4 px-15">
            <div className="w-12 h-12 rounded-full overflow-hidden" onClick={()=>router.push(`/profile/${user.username}`)}>
              <img
                className="w-13 h-13 rounded-full cursor-pointer"
                src={user?.profile || "https://www.w3schools.com/howto/img_avatar.png"}
                alt={'https://via.placeholder.com/150'}
              />
            </div>
            <div className="ml-4">
              <h2><b>{user?.Nickname || user.username}</b></h2>
              <p className="text-gray-500">@{user.username}</p>
              <p className="text-white-300">{user?.signature || ""}</p>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex justify-center items-center col-span-1">
        <div className="align-left">
          <Button isFollowed={isFollowed} handleFollow={handleFollow} />
        </div>
      </div>
    </div>
  );
};

export default User;
