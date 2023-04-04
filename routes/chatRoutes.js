const express = require("express");
const router = express.Router();
const Chat = require("../models/ChatModel");
const {
  getAllChats,
  getSpecificChat,
  addChat,
  deleteSpecificChat,
  updateChat,
  joinChat,
  createChat,
} = require("../controllers/chatController");

module.exports = (io) => {
  // GET ALL CHATS
  router.route("/").post(addChat(io)).get(getAllChats);
  //GET SPECIFIC CHAT
  router
    .route("/:chatId")
    .get(getSpecificChat)
    .delete(deleteSpecificChat)
    .put(updateChat(io));

  router.route("/").post(addChat(io));

  router.route("/join/:chatId").post(joinChat(io));

  router.route("/create").post(createChat);

  return router;
};
