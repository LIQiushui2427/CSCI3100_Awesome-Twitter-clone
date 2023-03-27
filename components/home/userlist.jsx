import React from "react";

const UserList = () => {
  const users = [
    {
      id: 1,
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
  ];

  return (
    <div className="rounded-lg shadow-md p-6">
      <h2 className="text-lg font-bold mb-4">Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="flex items-center space-x-4 py-4">
            <img
              className="w-10 h-10 rounded-full"
              src={user.avatar}
              alt={user.name}
            />
            <div>
              <h3 className="font-bold text-blue-300">{user.name}</h3>
              <button className="text-blue-500 hover:text-blue-700">
                View Profile
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
