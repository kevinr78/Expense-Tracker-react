import { useState } from "react";
import { Form, Link, redirect } from "react-router-dom";

export default function Header() {
  return (
    <div className="navbar base-content" id="header">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-6xl"
          >
            <li>
              <Link to={"/home"} name="home">
                Home
              </Link>
            </li>
            <li name="transactions">
              <Link to={"transactionHistory"} name="transactions">
                Transactions
              </Link>
            </li>
            <li>
              <Link to={"transactionCharts"} name="data-visualizer">
                Transaction Charts
              </Link>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">ExpenTracker</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={"/home"} name="home">
              Home
            </Link>
          </li>
          <li>
            <Link to={"transactionHistory"} name="transactions">
              Transactions
            </Link>
          </li>
          <li>
            <Link to={"transactionCharts"} name="data-visualizer">
              Transaction Charts
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <details className="dropdown">
          <summary className="m-1 btn">Currency</summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <li>
              <a>Rupee</a>
            </li>
            <li>
              <a>Dollar</a>
            </li>
          </ul>
        </details>
        <div>
          <Form action="/logout" method="POST">
            <button className="btn btn-outline">Logout</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export function logoutAction() {
  localStorage.removeItem("token");
  return redirect("/?mode=login");
}
