import React from "react";

function Circle({ fill, onClick, stroke }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
      onClick={onClick}
    >
      <circle cx="12" cy="12" r="6" stroke={stroke} strokeWidth="1.5" fill={fill} />
    </svg>
  );
}

export default Circle;
