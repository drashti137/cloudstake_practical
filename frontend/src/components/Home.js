import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io(`${process.env.REACT_APP_PUBLIC_URL}`);

const ChatJoinForm = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleRoomChange = (e) => {
    setRoom(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const room = e.target.room.value;
    localStorage.setItem("user", username);
    localStorage.setItem("room", room);
    socket.emit("joinRoom", { username, room });
    navigate("/chat");
  };

  return (
    <div className="join-container">
      <header className="join-header">
        <h1>
          <i className="fas fa-smile"></i> ChatCord
        </h1>
      </header>
      <main className="join-main">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter username..."
              required
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="room">Room</label>
            <select
              name="room"
              id="room"
              value={room}
              onChange={handleRoomChange}
            >
              <option value="Cloudstakes">Cloudstakes</option>
            </select>
          </div>
          <button type="submit" className="btn">
            Join Chat
          </button>
        </form>
      </main>
    </div>
  );
};

export default ChatJoinForm;
