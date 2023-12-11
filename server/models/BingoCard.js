let mongoose = require("mongoose");
const User = require("./User");
let Schema = mongoose.Schema;
let ObjectId = mongoose.Types.ObjectId;

let newSchema = new Schema({
  board: { type: String },
  userId: { type: ObjectId, ref: User },
});

module.exports = mongoose.model("BingoCard", newSchema);
