import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ setLoginCookie }) {
  const navigate = useNavigate();

  return (
    <div className="fixed bg-pink-400/95 w-full z-20">
      <div className="flex">
        <div className="w-1/2">
          <button
            className="mx-8 my-2"
            onClick={() => setLoginCookie(false)}
            type="button"
          >
            <p className="font-semibold text-pink-200">Exit</p>
          </button>
        </div>
        <div className="flex w-1/2 mr-8 sm:mr-16 justify-end">
          {[...Array(7)].map((_, i) => (
            <button
              className="inline mx-2 sm:mx-4 my-2"
              key={i}
              onClick={() => navigate(`/slides/${i}`)}
              type="button"
            >
              <p className="font-semibold text-pink-200">{i}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
