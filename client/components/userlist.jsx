import React, { useEffect, useState } from "react";
import User from "../components/user/user";
import { getUsername } from '../helper/helper'
/*
This is the code for the userlist component.
It defines the layout of the userlist.
It will invoke the user component to display the user.
It will be used to display the userlist on the home page.
If there is no user found, it will display a message.
*/
function UserList ({ searchKey, follower, following}) {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    async function fetchData() {
      if (searchKey) {
        const response = await fetch(`http://localhost:8080/api/searchUsers?key=${searchKey}`);
        const data = await response.json();
        setUsers(data.users);
      } else if (follower) {
        console.log("UserList: followers: ", follower);
        const response = await fetch(`http://localhost:8080/api/user_f/getFollowers?username=${follower}`);
        const data = await response.json();
        console.log("UserList: getFollowers: ", data);
        setUsers(data); // modify this line
      }
      else if(following){
        console.log("UserList: following: ", following);
        const response = await fetch(`http://localhost:8080/api/user_f/getFollowing?username=${following}`);
        const data = await response.json();
        console.log("UserList: getFollowing: ", data);
        setUsers(data); // modify this line
      }
    }
    
    fetchData();
    
    async function fetchUsername() {
      const username = await getUsername();
      setUsername(username);
    }
    fetchUsername();
  }, [searchKey, follower, following])
  console.log("UserList: users: ", users);
  if (!users || users.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        <p className="text-lg font-medium">No users found</p>
      </div>
    );
  }
  if(searchKey){
    return (
      <div className="rounded-lg shadow-md">
        {users? (
          <ul>
              {users.map((user) => (
              <User key={user.username} userId={user.username} currentUser={username} />
              ))}
          </ul>
        ) : (
          <div className="text-center mt-10 text-gray-500">
          <p className="text-lg font-medium">No users found </p>
          </div>
        )}
      </div>
    );
  }

  else if(follower || following){
    return (
      <div className="rounded-lg shadow-md">
        {users? (
          <ul>
              {users.map((username_) => (
              <User key={username_} userId={username_} currentUser={username} />
              ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )}
      </div>
    );
  }
};

export default UserList;