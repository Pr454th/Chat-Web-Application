import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("/");

function Test() {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("useEffect");
    socket.on("data", (newData) => {
      console.log(newData[0]);
      setData(newData[0].message);
    });
  }, [data]);

  return (
    <div>
      <h1 className="display">Messages</h1>
      {data.map((item, index) => (
        <div key={index}>
          <p>
            {item}: {item}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Test;
