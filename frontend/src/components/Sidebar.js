import React from "react";

const ChatSidebar = ({ roomName, users }) => {
  return (
    <div className="chat-sidebar">
      <h3>
        <i className="fas fa-comments"></i> Room Name
      </h3>
      <p id="room-name">{roomName}</p> <br />
      <h3>
        <i className="fas fa-users"></i> Users
      </h3>
      <ul id="users">
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatSidebar;
