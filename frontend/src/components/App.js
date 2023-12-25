import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login.js";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
