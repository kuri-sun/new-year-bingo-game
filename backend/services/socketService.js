const {
  generateRandNum,
  fillCell,
  returnNextTurnUser,
} = require("../utils/util");
const { updateBignoCard, getBignoCardByUserId } = require("./bingoCardService");
const { getRoom, updateRoomCurrent } = require("./roomService");
const { getUsersByRoomId } = require("./userService");

function setUpSocketEvents(io) {
  io.on("connection", (socket) => {
    // enter the room
    socket.on("enter", (data) => {
      let roomId = data.roomId;
      socket.join(roomId);
      console.log(
        `⚡: ${socket.id} user just enter to the room whose id is: ${roomId}!`
      );
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

    socket.on("disconnect", () => {
      console.log("🔥: A user disconnected");
    });
  });
}

module.exports = {
  setUpSocketEvents,
};
