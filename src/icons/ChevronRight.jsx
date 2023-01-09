import React from "react";

function ChevronRight({ className, fill, onClick, stroke, y }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      viewBox={`0 ${y} 24 24`}
      strokeWidth={1.5}
      stroke={stroke}
      className={`${className} w-4 h-4 ml-5 inline`}
      onClick={onClick}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>
  );
}

export default ChevronRight;
