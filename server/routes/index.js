var express = require("express");
const app = express();

const usersRoute = require("./user");
const roomsRoute = require("./room");
const bingoCardsRoute = require("./bingoCard");

app.use("/users", usersRoute);
app.use("/rooms", roomsRoute);
app.use("/bingoCards", bingoCardsRoute );

module.exports = app;
