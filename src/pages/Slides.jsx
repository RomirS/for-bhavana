import React from "react";
import { useParams } from "react-router-dom";

function Slides() {
  const { s } = useParams();
  return <div>{s}</div>;
}

export default Slides;
