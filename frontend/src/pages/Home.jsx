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
  const { loading, error, chat } = useSelector((state) => state.chatCreate);
  const generateRandomString = () => {
    let randomString =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    return randomString;
  };
  const createRoomHandle = () => {
    dispatch(createRoom({ name: generateRandomString() })).then(() => {
      const state = store.getState();
      console.log("Room state-->", state.chatCreate.chat);
      localStorage.setItem("chat", JSON.stringify(state.chatCreate.chat));
      navigate(`/chat/${state.chatCreate.chat.name}`);
    });
  };

  const joinRoomHandle = () => {
    if (roomCode === "") return;
    console.log("roomCode-->", roomCode);
    dispatch(joinRoom({ id: roomCode })).then((res) => {
      console.log("res-->", res);
      const state = store.getState();
      console.log("Join state-->", state);
      localStorage.setItem("chat", JSON.stringify(state.joinRoom.room));
      navigate(`/chat/${roomCode}`);
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl text-teal-400 font-bold mb-8">ChatVerse</h1>
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

    // <div className="grid grid-cols-12">
    //   <div className="col-span-12">
    //     <div className="flex flex-col items-center justify-center h-screen">
    //       <h1 className="text-3xl font-bold mb-8">Welcome to the Chat App</h1>
    //       <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
    //         <input
    //           type="text"
    //           id="room_code"
    //           value={roomCode}
    //           className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
    //           placeholder="Room Code"
    //           onChange={(e) => setRoomCode(e.target.value)}
    //         />
    //         <button
    //           className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
    //           onClick={joinRoomHandle}
    //         >
    //           Join Room
    //         </button>
    //         <button
    //           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
    //           onClick={createRoomHandle}
    //         >
    //           Create Room
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
