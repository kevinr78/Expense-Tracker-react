import React from "react";

export default function Input(props) {
  return (
    <input
      type={props.type}
      name={props.name}
      placeholder={props.placeholder ?? ""}
      className="input input-bordered w-full"
      required
      {...props}
    />
  );
}
