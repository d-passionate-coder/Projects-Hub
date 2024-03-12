import React from "react";
import { hydrate } from "react-dom";

const Button = ({
  color = "orange",
  text,
  height = "default",
  width = "default",
  show = true,
}) => {
  return (
    <div
      className={`${!show && "hidden"} ${
        color == "orange" ? "bg-orange text-white" : "bg-grey"
      }
      ${height == "default" ? "h-10" : "h-9"} ${
        width == "default" ? "w-20" : "w-auto px-2"
      } flex justify-center items-center rounded-md drop-shadow font-rem cursor-pointer`}
    >
      {text}
    </div>
  );
};

export default Button;
