const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

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
