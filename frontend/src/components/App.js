import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Start from "./Start";
import Login from "./Login";
import Register from "./Register";
import NavBar from "./NavBar";
import Home from "./app_components/Home";

function App() {
  const user = localStorage.getItem("token");
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Start />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          {user && <Route path="/home" element={<Home />}></Route>}
          <Route
            path="/home"
            element={<Navigate replace to={"/login"} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
