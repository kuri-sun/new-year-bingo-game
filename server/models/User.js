let mongoose = require("mongoose");
const Room = require("./Room");
let Schema = mongoose.Schema;
let ObjectId = mongoose.Types.ObjectId;

let newSchema = new Schema({
  name: { type: String, default: "" },
  roomId: { type: ObjectId, ref: Room },
  sortOrder: { type: Number },
});

module.exports = mongoose.model("User", newSchema);
