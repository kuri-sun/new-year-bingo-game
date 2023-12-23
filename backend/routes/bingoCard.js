var express = require("express");
var router = express.Router();

const {
  getBignoCardByUserId,
  updateBignoCard,
  refreshBignoCard,
  deleteBingoCard,
} = require("../services/bingoCardService");

// Get a bingo-card
router.get("/user/:id", async function (req, res, next) {
  try {
    let bc = await getBignoCardByUserId(req.params.id);
    res.json(bc);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Update a bingo-card
router.put("/:id", async function (req, res, next) {
  try {
    let { newBoard } = req.body;
    let bc = await updateBignoCard(req.params.id, newBoard);
    res.json(bc);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Refresh a new bingo-card
router.put("/refresh/:id", async function (req, res, next) {
  try {
    let bc = await refreshBignoCard(req.params.id);
    res.json(bc);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
