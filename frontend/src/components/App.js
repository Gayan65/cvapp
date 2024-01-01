import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./Start";
import Login from "./Login";
import Register from "./Register";
import NavBar from "./NavBar";
import Home from "./app_components/Home";
import Profile from "./app_components/Profile";
import Personal_Info from "./cv_components/Personal_Info";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/" element={<Start />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/personal_info" element={<Personal_Info />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
