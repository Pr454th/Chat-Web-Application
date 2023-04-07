const Chat = require("../models/ChatModel");

const getAllChats = async (req, res) => {
  try {
    console.log("getAllChats");
    const chats = await Chat.find();
    res.status(200).json(chats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getSpecificChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({ name: req.params.chatId });
    res.status(200).json(chat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const addChat = (object) => async (req, res) => {
  const chat = req.body;
  const newChat = new Chat(chat);
  try {
    await newChat.save();
    const chats = await Chat.find();
    object.emit("data", chats);
    return res.status(201).json(chats);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const joinChat = (object) => async (req, res) => {
  const chat = await Chat.findOne({ name: req.params.chatId });
  chat.user.push(chat.user.length + 1);
  try {
    await chat.save();
    const chats = await Chat.findOne({ name: req.params.chatId });
    object.emit("chats", chats);
    const chatRes = {
      name: chats.name,
      user: chats.user[chats.user.length - 1],
    };
    return res.status(201).json(chatRes);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const createChat = async (req, res) => {
  console.log(req.body);
  const chat = {
    name: req.body.name,
    user: 0,
  };
  const newChat = new Chat(chat);
  try {
    await newChat.save();
    return res.status(201).send(newChat);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const deleteSpecificChat = async (req, res) => {
  try {
    await Chat.findByIdAndRemove(req.params.chatId);
    res.json({ message: "Chat deleted successfully." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateChat = (object) => async (req, res) => {
  try {
    console.log(req.params.chatId);
    console.log(req.body.message);
    const chat = await Chat.updateOne(
      { name: req.params.chatId },
      {
        $push: { message: req.body.message },
      }
    );
    const chats = await Chat.find({ name: req.params.chatId });
    object.emit("data", chats);
    return res.status(201).json(chat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getAllChats,
  getSpecificChat,
  addChat,
  deleteSpecificChat,
  updateChat,
  joinChat,
  createChat,
};
