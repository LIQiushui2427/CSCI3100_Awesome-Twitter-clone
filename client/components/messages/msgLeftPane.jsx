import React from "react";

const MsgLeftPane = ({ chatters }) => {
  return (
    <div className="flex fixed   left-80 w-34">
      <div className="flex-1 overflow-y-auto">
        {chatters.map((chatter) => (
          <div
            key={chatter.id}
            className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer"
          >
            <img
              src={chatter.image}
              alt={chatter.name}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-white font-medium">{chatter.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MsgLeftPane;
