import { React, useState } from "react";
import Message from "./message";

const MessageContent = ({ messages }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle sending new message
  };

  return (
    <div className="fixed bottom-0 left-1/3 w-1/3">
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto mb-6">
          {messages && messages.length > 0 ? (
            messages.map((message) => (
              <Message key={message.id} message={message} />
            ))
          ) : (
            <p>No messages yet.</p>
          )}
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex">
            <input
              type="text"
              value={newMessage}
              onChange={(event) => setNewMessage(event.target.value)}
              placeholder="Type a message..."
              className="flex-1 border rounded-lg px-4 py-2 mr-2 text-white bg-transparent focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageContent;