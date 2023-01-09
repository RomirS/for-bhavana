import React, { useEffect, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { withCookies } from "react-cookie";

import { storage } from "../db/config";

const PASSWORD = "fromrome";

function Login({ setLoginCookie }) {
  const [, setImage] = useState();
  const [password, setPassword] = useState("");

  useEffect(() => {
    getDownloadURL(ref(storage, "images/lockscreen/coderbhav.jpg")).then((url) => {
      setImage(url);
    });
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;

    setPassword(value);

    if (value === PASSWORD) {
      setLoginCookie(true, { maxAge: 60 * 5 });
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center items-center h-screen max-w-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </div>
        <div className="block">
          <label
            className="block text-gray-500 font-semibold mt-5"
            htmlFor="password"
          >
            What's the password?
            <input
              className="block border-t-gray-300 focus:border-t-gray-100 border-t rounded-none mt-2 pt-2"
              type="text"
              name="password"
              placeholder={"*".repeat(PASSWORD.length)}
              value={password}
              onChange={handleChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default withCookies(Login);
