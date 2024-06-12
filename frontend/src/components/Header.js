import React from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_PUBLIC_URL);

const ChatHeader = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const currentUser = localStorage.getItem("user");
    socket.emit("leaveRoom", currentUser);
    navigate("/");
  };

  const currentUser = localStorage.getItem("user");
  return (
    <header className="chat-header">
      <h1>
        <i className="fas fa-smile"></i> Welcome {currentUser}
      </h1>
      <button onClick={handleSubmit} className="btn">
        Leave Room
      </button>
    </header>
  );
};

export default ChatHeader;
