import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatJoinForm from "./components/Home";
import ChatCord from "./components/Chat";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<ChatJoinForm />}></Route>
            <Route path="/chat" element={<ChatCord />}></Route>
            <Route path="*" element={<h1>Oops...Nothing Found</h1>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
