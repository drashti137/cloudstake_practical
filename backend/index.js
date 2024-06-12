const http = require("http");
const express = require("express");
const formatMessage = require("./utils/messages");
const {
  userJoin,
  userLeave,
  getRoomUsers
} = require("./utils/users");
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: `${process.env.REACT_APP_PUBLIC_URL}`,
    methods: ["GET", "POST"],
  },
});

const botName = "ChatApp bot";

io.on("connect", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(room);

    socket.emit(
        "message",
        formatMessage(botName, `${username} has joined the chat`)
      );

    // users and room info
    io.emit("roomUsers", {
      room: room,
      users: getRoomUsers(room)
    });
  });

  socket.on("newMessage", (username,message) => {
    io.emit("message", formatMessage(username, message));
  });

  socket.on("leaveRoom", (username) => {
    const user = userLeave(socket.id);
      io.emit(
        "message",
        formatMessage(botName, `${username} has disconnected`)
      );
    socket.disconnect();
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
