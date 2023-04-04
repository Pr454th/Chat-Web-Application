import React from "react";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Test from "./pages/Test";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/chat/:id" element={<Chat />} />
        {/* <div className="grid grid-cols-12">
            <div className="col-span-2"></div>
            <div className="col-span-10 overflow-y-auto">
              <Chat />
            </div>
          </div> */}
        <Route path="/test" element={<Test />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
