import React from "react";

function ArrowRightCircle({ className, onClick, stroke }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 2 24 24"
      strokeWidth={1.5}
      stroke={stroke}
      className={`${className} w-5 h-5 inline`}
      onClick={onClick}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

export default ArrowRightCircle;
