import { useState } from "react";

export default function CTA(props) {
  return (
    <>
      <div className=" flex justify-center ">
        <div
          className="bg-gray-200 dark:bg-gray-800 flex flex-col justify-center items-center mx-10 my-10 py-4 px-4  rounded-2xl"
          data-id={props.name}
        >
          <button
            onClick={props.onClick}
            className="btn btn-circle btn-outline btn-accent"
          >
            {props.children}
            {/* <img className="w-8" src={AddExpenseLogo} alt="" /> */}
          </button>
          <p className="my-4">{props.text}</p>
        </div>
      </div>
    </>
  );
}
