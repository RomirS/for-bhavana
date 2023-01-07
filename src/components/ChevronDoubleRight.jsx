import React from "react";

function ChevronDoubleRight({ className, fill, onClick, stroke }) {
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
        d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
      />
    </svg>
  );
}

export default ChevronDoubleRight;
