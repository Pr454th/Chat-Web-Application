import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getChatDetail, updateChat } from "../actions/chatActions";
import io from "socket.io-client";
import axios from "axios";

const socket = io("/");

const userColors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-pink-500",
  "bg-purple-500",
  "bg-emerald-400",
  "bg-violet-500",
  "bg-cyan-400",
];

export default function Chat() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [newMessage, setnewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const data = JSON.parse(localStorage.getItem("chat"));

  const handleSend = (e) => {
    e.preventDefault();
    const user = data.user;
    dispatch(
      updateChat({ name: id, message: { user: user, message: newMessage } })
    ).then(() => {
      setnewMessage("");
    });
  };
  const handleLeave = () => {
    localStorage.removeItem("chat");
    window.location.href = "/";
  };
  useEffect(() => {
    socket.on("data", (newData) => {
      // console.log("newData-->", newData);
      if (newData != null) setMessages(newData[0]);
    });
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    axios.get(`/api/chat/${id}`).then((res) => {
      // console.log(res.data.message);
      setMessages(res.data);
    });
  }, []);

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-black">
      <div className="flex items-center justify-between px-4 py-2">
        <h1 className="text-2xl font-medium text-black dark:text-white">
          {id}
        </h1>
        <button
          className="px-8 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded-full"
          onClick={handleLeave}
        >
          Leave
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-2">
        <div style={{ marginBottom: "120px" }}>
          {messages &&
            messages.message &&
            messages.message.map((message, index) => {
              let c1 = "flex flex-end justify-start";
              let i = message.user % userColors.length;
              let chatColor = userColors[i];
              let c2 = `m-1.5 w-3/4 py-3 px-4 ${chatColor} rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white`;
              if (JSON.stringify(message.user) === JSON.stringify(data.user)) {
                // console.log(message.user, data.user);
                c1 = "flex flex-end justify-end";
                c2 = `m-1.5 w-3/4 py-3 px-4 ${chatColor} rounded-bl-3xl rounded-tr-xl rounded-tl-3xl text-white`;
              }
              return (
                <div className={`${c1}`} key={index}>
                  <div className={`${c2}`}>
                    {message.message}
                    {/* -{message.user} */}
                  </div>
                </div>
              );
            })}
          <div ref={messagesEndRef} />
        </div>
        <div className="fixed bottom-0 w-full">
          <form className=" mr-8 bg-white flex p-2 rounded-full drop-shadow-2xl mb-10 dark:bg-black">
            <input
              className="bg-white dark:bg-black text-black dark:text-white w-full rounded-full px-4 border border-white-300 outline-none focus:border-blue-500"
              type="text"
              placeholder="Type your message here"
              value={newMessage}
              onChange={(e) => setnewMessage(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 rounded-full px-8 h-14 text-white ml-2"
              onClick={handleSend}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
