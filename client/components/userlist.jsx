import React, { useEffect, useState } from "react";
import User from "../components/user/user";
import { getUsername } from '../helper/helper'

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
          <p>No users found.</p>
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