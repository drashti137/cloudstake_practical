import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./chat.css";
import ChatHeader from "./Header";
import ChatSidebar from "./Sidebar";
import ChatMessages from "./Messages";
import ChatForm from "./ChatForm";

const socket = io(process.env.REACT_APP_PUBLIC_URL);

const ChatCord = () => {
  const [roomName, setRoomName] = useState("");
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("roomUsers", ({ room, users }) => {
      setRoomName(room);
      setUsers(users);
    });

    return () => {
      socket.off("message");
      socket.off("roomUsers");
    };
  }, [users, roomName]);

  const sendMessage = (msg) => {
    const currentUser = localStorage.getItem("user");
    socket.emit("newMessage", currentUser, msg);
  };

  return (
    <div className="chat-container">
      <ChatHeader />
      <main className="chat-main">
        <ChatSidebar roomName={roomName} users={users} />
        <ChatMessages messages={messages} />
      </main>
      <ChatForm sendMessage={sendMessage} />
    </div>
  );
};

export default ChatCord;
