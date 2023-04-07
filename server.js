const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const socketIO = require("socket.io");
const cors = require("cors");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(bodyParser.json());
app.use(cors());
const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: "*" } });
const Chat = require("./models/ChatModel");

Chat.watch().on("change", (change) => {
  console.log("change", change.fullDocument);
  io.emit("data", change.fullDocument);
});

const chatRoutes = require("./routes/chatRoutes");
app.use("/api/chat", chatRoutes(io));
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, ".", "frontend", "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

server.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});

module.exports = app;

// const express = require("express");
// const http = require("http");
// const socketIO = require("socket.io");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const app = express();
// const bodyParser = require("body-parser");
// const router = express.Router();
// app.use(bodyParser.json());
// app.use(cors());
// const server = http.createServer(app);
// const io = socketIO(server, { cors: { origin: "*" } });
// require("dotenv").config();

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

// // Define a schema for your data model
// const mySchema = new mongoose.Schema({
//   name: String,
//   value: Number,
// });

// // Create a model for your data
// const MyModel = mongoose.model("MyModel", mySchema);

// // Listen for changes to your collection and emit updates
// MyModel.watch().on("change", (change) => {
//   io.emit("data", change.fullDocument);
// });

// router
//   .route("/api/note")
//   .post(async (req, res) => {
//     try {
//       const { name, value } = req.body;
//       const myModel = await new MyModel({ name, value });
//       myModel.save();
//       res.send("Data saved");
//     } catch (err) {
//       console.log(err);
//     }
//   })
//   .get(async (req, res) => {
//     try {
//       const myModel = await MyModel.find();
//       res.send(myModel);
//     } catch (err) {
//       console.log(err);
//     }
//   });

// app.use(router);

// // Start server
// server.listen(3001, () => {
//   console.log("Server started on port 3001");
// });
