const BingoCard = require("../models/BingoCard");
const { generateNewBoard } = require("../utils/util");

async function getBignoCardByUserId(userId) {
  let cards = await BingoCard.findOne({ userId: userId });
  return cards;
}

async function addBingoCard(userId) {
  let newBigoCard = await BingoCard.create({
    userId: userId,
    board: JSON.stringify(generateNewBoard()),
  });

  return newBigoCard;
}

async function updateBignoCard(id, newBoard) {
  let foundCard = await BingoCard.findById(id);
  foundCard.board = newBoard;
  await foundCard.save();
  return foundCard;
}

async function refreshBignoCard(id) {
  let foundCard = await BingoCard.findById(id);
  foundCard.board = JSON.stringify(generateNewBoard());
  await foundCard.save();
  return foundCard;
}

async function deleteBingoCard(id) {
  await BingoCard.findByIdAndDelete(id);
}

module.exports = {
  addBingoCard,
  updateBignoCard,
  refreshBignoCard,
  getBignoCardByUserId,
  deleteBingoCard,
};
