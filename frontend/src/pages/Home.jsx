import React from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { createRoom, joinRoom } from "../actions/chatActions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const store = useStore();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [roomCode, setRoomCode] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [createOrJoin, setCreateOrJoin] = useState(1);
  const { loading, error, chat } = useSelector((state) => state.chatCreate);
  const generateRandomString = () => {
    let randomString =
      Math.random().toString(36).substring(2, 4) +
      Math.random().toString(36).substring(2, 4);
    return randomString;
  };
  const createRoomHandle = () => {
    dispatch(createRoom({ name: generateRandomString() })).then(() => {
      const state = store.getState();
      // console.log("Room state-->", state.chatCreate.chat);
      localStorage.setItem("chat", JSON.stringify(state.chatCreate.chat));
      setRoomCode(state.chatCreate.chat.name);
      setShowPopup(true);
      const timer = setTimeout(() => {
        setShowPopup(false);
        navigate(`/chat/${state.chatCreate.chat.name}`);
      }, 5000);
      return () => clearTimeout(timer);
    });
  };

  const joinRoomHandle = () => {
    if (roomCode === "") return;
    // console.log("roomCode-->", roomCode);
    setCreateOrJoin(2);
    dispatch(joinRoom({ id: roomCode })).then((res) => {
      // console.log("res-->", res);
      const state = store.getState();
      // console.log("Join state-->", state);
      localStorage.setItem("chat", JSON.stringify(state.joinRoom.room));
      setShowPopup(true);
      const timer = setTimeout(() => {
        setShowPopup(false);
        navigate(`/chat/${roomCode}`);
      }, 5000);
      return () => clearTimeout(timer);
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl text-teal-400 font-bold mb-8">ChatVerse</h1>
        {showPopup && (
          <div className="border-2 border-solid border-rose-500 bg-white dark:bg-black fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-8">
            <p className="text-xl font-semibold mb-4">
              {createOrJoin === 1 ? "Chat Room Created" : "Chat Room Joined"}
            </p>
            <h1 className="text-gray-500 text-2xl text-center text-black dark:text-cyan-400">
              {roomCode}
            </h1>
            <p className="text-center text-sm mt-4">
              You will be redirected in 5 seconds
            </p>
          </div>
        )}
        <div className="flex flex-col items-center">
          <label htmlFor="room_code" className="mb-4 text-lg">
            Join an existing room
          </label>
          <div className="flex items-center">
            <input
              id="room_code"
              type="text"
              value={roomCode}
              placeholder="Enter room code"
              className="bg-gray-700 px-4 py-2 rounded-l-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-600"
              onChange={(e) => setRoomCode(e.target.value)}
            />
            <button
              className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              onClick={joinRoomHandle}
            >
              Join
            </button>
          </div>
        </div>
        <button
          className="bg-green-700 px-4 py-2 rounded-lg mt-8 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
          onClick={createRoomHandle}
        >
          Create a new room
        </button>
      </div>
    </div>
  );
}
