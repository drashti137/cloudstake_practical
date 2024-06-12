import React from "react";

const ChatMessages = ({ messages }) => {
  return (
    <div className="chat-messages">
      {messages.map((message, index) => (
        <div className="message" key={index}>
          <p className="meta">
            {message.username || message.user} <span>{message.time}</span>
          </p>
          <p className="text">{message.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
