var express = require("express");
var router = express.Router();

const {
  getUsersByRoomId,
  addUser,
  deleteUser,
} = require("../services/userService");
const { getBignoCardByUserId } = require("../services/bingoCardService");

// Get users by room-id
router.get("/room/:id", async function (req, res, next) {
  try {
    let users = await getUsersByRoomId(req.params.id);
    res.json(users);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Add a user (Enter a room)
router.post("/", async function (req, res, next) {
  try {
    let { name, roomId } = req.body;
    let existingUsers = await getUsersByRoomId(roomId);
    let newUser = await addUser(name, roomId, existingUsers.length);
    res.json(newUser);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Delete a user
router.delete("/:id", async function (req, res, next) {
  try {
    await deleteUser(req.params.id);
    const { _id } = await getBignoCardByUserId(req.params.id);
    await deleteBingoCard(_id);
    res.status(200);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
