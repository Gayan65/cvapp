import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./Start";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
