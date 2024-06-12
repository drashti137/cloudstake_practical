const fs = require('fs');
const path = require('path');

const roomsPath = path.join(__dirname, 'rooms');

// Ensure the rooms directory exists
fs.mkdirSync(roomsPath, { recursive: true });

// join user to chat
function userJoin(socketId, username, room) {
  const user = { socketId, username, room };
  const roomPath = path.join(roomsPath, `${room}.json`);

  try {
    if (!fs.existsSync(roomPath)) {
      fs.writeFileSync(roomPath, JSON.stringify({ users: [] }));
    }

    const roomData = JSON.parse(fs.readFileSync(roomPath));

    const userExists = roomData.users.includes(username);
    if (userExists) {
      console.log(`User ${username} already exists in room ${room}`);
      return user;
    }

    roomData.users.push(username);
    fs.writeFileSync(roomPath, JSON.stringify(roomData));

    return user;
  } catch (err) {
    console.error('Error writing room file:', err);
    return null;
  }
}

// user leaves chat
function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// get room users
function getRoomUsers(room) {
  const roomFilePath = path.join(roomsPath, `${room}.json`);

  try {
    if (!fs.existsSync(roomFilePath)) {
      return [];
    }

    const roomData = JSON.parse(fs.readFileSync(roomFilePath));
    console.log("🚀 ~ getRoomUsers ~ roomData:", room,roomData.users)
    return roomData.users;
  } catch (err) {
    console.error('Error reading room file:', err);
    return [];
  }
}

module.exports = {
  userJoin,
  userLeave,
  getRoomUsers
};
