var express = require("express");
var router = express.Router();

const {
  getAllRooms,
  addRoom,
  deleteRoom,
  getRoom,
  updateRoomCurrent,
} = require("../services/roomService");
const { addUser } = require("../services/userService");

// Get all rooms
router.get("/", async function (req, res, next) {
  try {
    let rooms = await getAllRooms();
    res.json(rooms);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//get a room
router.get("/:id", async function (req, res, next) {
  try {
    let room = await getRoom(req.params.id);
    res.json(room);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Add a room
router.post("/", async function (req, res, next) {
  try {
    let { name, players } = req.body;
    // create a new room.
    let data = await addRoom(name, players);
    res.json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Delete a room
router.delete("/:id", async function (req, res, next) {
  try {
    await deleteRoom(req.params.id);
    res.status(200);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
