import React, { useEffect, useState } from "react";
import User from "../components/user/user";

const UserList = ({ searchKey }) => {
  const [users, setUsers] = useState([]);
  console.log("UserList component: searchKey: ", searchKey);
  useEffect(() => {
    async function fetchData() {
      if (searchKey) {
        const response = await fetch(`http://localhost:8080/api/searchUsers?key=${searchKey}`);
        const data = await response.json();
        setUsers(data.users);
      }
    }
    fetchData();
  }, [searchKey]);

  return (
    <div className="rounded-lg shadow-md p-6">
      {users? (
        <ul>
          {users.map((user) => (
            <User key={user.username} userId={user.username} />
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UserList;
