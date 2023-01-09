import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ setLoginCookie }) {
  const navigate = useNavigate();

  return (
    <div className="fixed bg-white w-full">
      <div className="flex">
        <div className="w-1/2">
          <button
            className="mx-8 my-4"
            onClick={() => setLoginCookie(false)}
            type="button"
          >
            <p className="text-gray-400">Exit</p>
          </button>
        </div>
        <div className="flex w-1/2 mr-8 sm:mr-16 justify-end">
          {[...Array(7)].map((_, i) => (
            <button
              className="inline mx-4 my-4"
              key={i}
              onClick={() => navigate(`/slides/${i}`)}
              type="button"
            >
              <p className="text-gray-400">{i}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
