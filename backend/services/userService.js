const User = require("../models/User");
const { addBingoCard } = require("./bingoCardService");

async function getUser(id) {
  let foundUser = await User.findById(id);
  return foundUser;
}

async function getUsersByRoomId(roomId) {
  let users = await User.find({});
  return users.filter((u) => u.roomId.toString() === roomId.toString());
}

async function addUser(name, roomId, sortOrder) {
  // a new user
  let newUser = await User.create({
    name,
    roomId,
    sortOrder,
  });
  // append a new BingoCard to user.
  await addBingoCard(newUser._id);
  return newUser;
}

async function deleteUser(id) {
  await User.findByIdAndDelete(id);
  return "success";
}

async function deleteUsers(ids) {
  await User.deleteMany({
    _id: {
      $in: ids,
    },
  });
  return "success";
}

module.exports = {
  getUser,
  getUsersByRoomId,
  addUser,
  deleteUser,
  deleteUsers,
};
