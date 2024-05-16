import React from "react";

export default function Input(props) {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder ?? ""}
      className="input input-bordered w-full"
      required
      {...props}
    />
  );
}
