import React from "react";
import Input from "../components/Input";
import { Form, useSearchParams, Link, redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Authentication() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  return (
    <div className=" flex h-screen flex-col ">
      <div className="navbar bg-neutral text-neutral-content ">
        <button className="btn btn-ghost text-xl">ExpenTracker</button>
      </div>
      <main className="flex-1 flex flex-col justify-start pt-[100px]  items-center">
        <h1 className="text-4xl font-bold text-center">
          {isLogin ? "Login" : "Register"}
        </h1>
        <Form method="post" action="/">
          {!isLogin && (
            <Input
              type="text"
              placeholder="Name"
              name="name"
              className="input input-bordered input-lg w-full border-b-8 my-5"
            />
          )}
          <Input
            type="email"
            placeholder="Email"
            name="email"
            className="input input-bordered input-lg w-full border-b-8 my-5"
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            className="input input-bordered input-lg w-full border-b-8 my-5"
          />

          <div className="flex justify-between">
            <button type="submit" className="btn">
              {isLogin ? "Login" : "Register"}
            </button>
            <Link
              to={`?mode=${isLogin ? "register" : "login"}`}
              className="btn"
            >
              {isLogin
                ? "New Here? Create an Account"
                : "Already a User? Log In!"}
            </Link>
          </div>
        </Form>
      </main>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
    </div>
  );
}

export async function action({ request }) {
  const searchParams = new URLSearchParams(window.location.search);

  const mode = searchParams.get("mode") ?? "register";
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const response = await fetch("http://localhost:3000/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  let dataFromServer = await response.json();
  if (!dataFromServer.ok) {
    console.log(dataFromServer);
    return toast.warn(dataFromServer.message, { theme: "dark" });
  }

  localStorage.setItem("token", JSON.stringify(dataFromServer.token));

  return redirect("/home");
}
