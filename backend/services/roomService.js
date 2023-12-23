const Room = require("../models/Room");
const { addUser } = require("./userService");

async function getAllRooms() {
  let rooms = await Room.find();
  return rooms;
}

async function getRoom(id) {
  let room = await Room.findById(id);
  return room;
}

async function addRoom(name, players) {
  // create a new room.
  let newRoom = await Room.create({
    name: name,
    cunsumedNums: [],
  });
  const roomId = newRoom._id.toString();
  // put players into the room.
  let users = [];
  await addUsers([...players], users, roomId);
  // set the current user turn
  await updateRoomCurrent(roomId, users[users.length - 1]._id);
  return { room: newRoom, users };
}

// helper
async function addUsers(players, users, roomId) {
  if (players.length === 0) return;
  const player = players.shift();
  const user = await addUser(player, roomId, players.length);
  users.push(user);

  await addUsers(players, users, roomId);
}

async function updateRoomCurrent(id, newCurrentUserId) {
  let room = await Room.findById(id);
  room.current = newCurrentUserId;
  room.save();
  return room;
}

async function deleteRoom(id) {
  await Room.findByIdAndDelete(id);
}

module.exports = {
  getAllRooms,
  getRoom,
  addRoom,
  updateRoomCurrent,
  deleteRoom,
};
