import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getChatDetail, updateChat } from "../actions/chatActions";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:3001/");

export default function Chat() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [newMessage, setnewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const data = JSON.parse(localStorage.getItem("chat"));
  socket.on("data", (newData) => {
    console.log("newData-->", newData);
    if (newData != null) setMessages(newData[0]);
  });

  const handleSend = (e) => {
    e.preventDefault();
    const user = data.user[data.user.length - 1];
    dispatch(
      updateChat({ name: id, message: { user: user, message: newMessage } })
    );
  };
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    axios.get(`http://localhost:3001/api/chat/${id}`).then((res) => {
      console.log(res.data.message);
      setMessages(res.data);
    });
  }, []);

  return (
    <>
      <div style={{ marginBottom: "120px" }}>
        {messages &&
          messages.message &&
          messages.message.map((message, index) => {
            let c1 = "flex flex-end justify-start ";
            let c2 =
              "m-1.5 w-3/4 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white";
            if (index % 2 === 0) {
              c1 = "flex flex-end justify-end";
              c2 =
                "m-1.5 w-3/4 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white";
            }
            return (
              <div className={`${c1}`} key={index}>
                <div className={`${c2}`}>
                  {message.message}-{message.user}
                </div>
              </div>
            );
          })}
        <div ref={messagesEndRef} />
      </div>
      <div className="fixed bottom-0 w-4/5">
        <form className="bg-white flex p-2 rounded-full drop-shadow-2xl mb-10">
          <input
            className="w-full rounded-full px-4 border border-white-300 outline-none focus:border-blue-500"
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
    </>
  );
}
