import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRoom } from "../actions/chatActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, chat } = useSelector((state) => state.chatCreate);
  const generateRandomString = () => {
    let randomString =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    return randomString;
  };
  const createRoomHandle = () => {
    dispatch(createRoom({ name: generateRandomString() }));
    console.log("random-->", chat);
  };
  useEffect(() => {
    if (chat && localStorage.getItem("chat") === null) {
      console.log("chat-->", chat);
      localStorage.setItem("chat", JSON.stringify(chat));
      navigate(`/chat/${chat.name}`);
    }
  }, [chat]);

  const joinRoom = () => {
    // dispatch(joinChat())
  };

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12">
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl font-bold mb-8">Welcome to the Chat App</h1>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="text"
              id="room_code"
              className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
              placeholder="Room Code"
            />
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              //   onClick={joinRoom}
            >
              Join Room
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={createRoomHandle}
            >
              Create Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
