import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Slides from "./pages/Slides";
import Sli from "./pages/Slide";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" exact element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="slides" element={<Slides />} />
        <Route path="slides/:s" element={<Sli />} />
      </Routes>
    </div>
  );
}

export default App;
