import React, { useEffect, useState } from "react";
import Button from "../follow_button";

const User = ({ userId }) => {
  const [user, setUser] = useState(null);
  console.log("User: ", userId);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:8080/api/user/${userId}`);
      const data = await response.json();
      setUser(data);
    }
    fetchData();
  }, [userId]);

  if (!user) {
    return <p>Loading user...</p>;
  }
  return (
    <div className="grid grid-cols-3 gap-0">
      <div className="container col-span-2 ml-auto mx-auto pt-3 pl-5 ">
        <ul>
          <li key={user.username} className="flex items-center py-4 px-15">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                className="w-10 h-10 rounded-full cursor-pointer"
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
          <Button />
        </div>
      </div>
    </div>

  );
};

export default User;
