const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("dotenv").config();

const chatSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    default: [],
  },
  user: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Chat", chatSchema);
