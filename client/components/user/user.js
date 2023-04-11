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
    <li className="flex items-center space-x-4 py-4">
      <img
        className="w-10 h-10 rounded-full"
        src={user.avatar}
        alt={'https://via.placeholder.com/150'}
      />
      <div>
        <h3 className="font-bold w-40 text-blue-300">{user.username}</h3>
        <button className="text-blue-500 hover:text-blue-700">
          View Profile
        </button>
        <Button text="Follow" />
      </div>
    </li>
  );
};

export default User;
