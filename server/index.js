const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

const EXPRESS_PORT = 3000;
const WEB_SOCKET_PORT = 4000;
const uri =
  "mongodb+srv://haruki:test@cluster0.dqivi.mongodb.net/?retryWrites=true&w=majority";

const { Server } = require("socket.io");
const io = new Server({
  cors: {
    origin: "*",
  },
});

// connecting with mongo db with mongoose, this will connect your server with mongo database
mongoose
  .connect(uri)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => console.error("err: ", err));

// middlewares
app.use(cors());
app.use(express.json());

// routes
const routes = require("./routes");
const { setUpSocketEvents } = require("./services/socketService");
app.use("/", routes);

// start rest server
app.listen(EXPRESS_PORT, () => {
  console.log(`app listening on port ${EXPRESS_PORT}`);
});

// start chat server
setUpSocketEvents(io);
io.listen(WEB_SOCKET_PORT);
