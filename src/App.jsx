import React, { useCallback } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import Login from "./pages/Login";
import Slide from "./pages/Slide";

function App() {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["isLoggedIn"]);
  const { isLoggedIn } = cookies;

  const setLoginCookie = useCallback(
    (value, options) => {
      setCookies("isLoggedIn", value, { path: "/", ...options });
    },
    [setCookies]
  );

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          exact
          element={
            isLoggedIn === "true" ? (
              <Navigate to="/slides/0" replace />
            ) : (
              <Login setLoginCookie={setLoginCookie} />
            )
          }
        />
        <Route
          path="/login"
          exact
          element={
            isLoggedIn === "true" ? (
              <Navigate to="/slides/0" replace />
            ) : (
              <Login setLoginCookie={setLoginCookie} />
            )
          }
        />
        <Route
          path="/slides/:s"
          element={
            isLoggedIn === "true" ? (
              <Slide navigate={navigate} setLoginCookie={setLoginCookie} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
