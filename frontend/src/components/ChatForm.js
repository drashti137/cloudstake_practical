import React, { useState } from "react";

const ChatForm = ({ sendMessage }) => {
  const [msg, setMsg] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    sendMessage(msg);
    setMsg("");
  };

  return (
    <div className="chat-form-container">
      <form id="chat-form" onSubmit={onSubmit}>
        <input
          id="msg"
          type="text"
          placeholder="Enter Message"
          required
          autoComplete="off"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="btn">
          <i className="fas fa-paper-plane"></i> Send
        </button>
      </form>
    </div>
  );
};

export default ChatForm;
