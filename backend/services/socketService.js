const {
  generateRandNum,
  fillCell,
  returnNextTurnUser,
} = require("../utils/util");
const { updateBignoCard, getBignoCardByUserId } = require("./bingoCardService");
const {
  getRoom,
  updateRoomCurrent,
  deleteRoom,
  updateRoomAndResetConsumedNum,
} = require("./roomService");
const { getUsersByRoomId, deleteUsers } = require("./userService");

function setUpSocketEvents(io) {
  io.on("connection", (socket) => {
    // enter the room
    socket.on("enter", (data) => {
      let roomId = data.roomId;
      socket.join(roomId);
      console.log(
        `⚡: ${socket.id} user just enter to the room whose id is: ${roomId}!`
      );
      io.in(roomId).emit("enter", {});
    });

    // spin the roulette
    socket.on("roulette", async (data) => {
      let roomId = data.roomId;

      // Get the players in the room.
      let players = await getUsersByRoomId(roomId);

      // generate the random nubmer.
      let room = await getRoom(roomId);
      let ranNum = generateRandNum(room.consumedNums);

      // update each user's bingo card
      players.forEach(async (player) => {
        const id = player._id;
        let bingoCard = await getBignoCardByUserId(id);
        let newBoard = fillCell(bingoCard.board.toString(), ranNum);
        await updateBignoCard(bingoCard._id.toString(), newBoard);
      });

      // update the turn.
      const nextTurnUser = returnNextTurnUser(
        [...players],
        room.current.toString()
      );
      await updateRoomCurrent(room._id, nextTurnUser._id, ranNum);

      io.in(roomId).emit("roulette", { ranNum, nextTurn: nextTurnUser._id });
    });

    socket.on("exitRoom", async (data) => {
      // connected users and the room
      let sessionUsers = data.sessionUsers;
      let roomId = data.roomId;

      // get the room
      let room = await getRoom(roomId);

      // bulk delete users that were connected.
      let ids = sessionUsers.map((u) => u._id);
      await deleteUsers(ids);

      // check there is users in the room.
      let users = await getUsersByRoomId(room._id);
      if (users.length > 0) {
        // update the turn.
        const nextTurnUser = returnNextTurnUser(
          [...users],
          room.current.toString()
        );
        await updateRoomAndResetConsumedNum(room._id, nextTurnUser._id);
      } else {
        // remove the room
        await deleteRoom(room._id);
        console.log("Deleted the room, no one is in there.");
      }

      console.log("A user exit the room");
    });

    socket.on("disconnect", () => {
      console.log("🔥: A user disconnected");
    });
  });
}

module.exports = {
  setUpSocketEvents,
};
