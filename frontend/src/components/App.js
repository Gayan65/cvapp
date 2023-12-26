import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./Start";
import Login from "./Login";
import Register from "./Register";
import NavBar from "./NavBar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Start />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
