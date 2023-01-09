import React, { useCallback } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import Login from "./pages/Login";
import Slide from "./pages/Slide";

function App() {
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
            isLoggedIn === "true" || isLoggedIn === "notbhav" ? (
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
            isLoggedIn === "true" || isLoggedIn === "notbhav" ? (
              <Navigate to="/slides/0" replace />
            ) : (
              <Login setLoginCookie={setLoginCookie} />
            )
          }
        />
        <Route
          path="/slides/:s"
          element={
            isLoggedIn === "true" || isLoggedIn === "notbhav" ? (
              <Slide isLoggedIn={isLoggedIn} setLoginCookie={setLoginCookie} />
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
