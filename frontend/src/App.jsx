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
        <Route path="/test" element={<Test />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
