import React from "react";

function ChevronDoubleLeft({ className, fill, onClick, stroke }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      viewBox="0 4 24 24"
      strokeWidth={1.5}
      stroke={stroke}
      className={`${className} w-4 h-4 inline`}
      onClick={onClick}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
      />
    </svg>
  );
}

export default ChevronDoubleLeft;
