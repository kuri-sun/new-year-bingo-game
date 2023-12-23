let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ObjectId = mongoose.Types.ObjectId;

let newSchema = new Schema({
  name: { type: String, default: "" },
  current: { type: ObjectId },
  cunsumedNums: [{ type: Number }],
});

module.exports = mongoose.model("Room", newSchema);
