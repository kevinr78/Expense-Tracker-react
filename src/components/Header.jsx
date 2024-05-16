import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header({ gg }) {
  const [activeTab, setActiveTab] = useState("home");
  function handleClick(e) {
    gg(e.target.name);
  }
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
            <li onClick={handleClick}>
              <a name="home" className="tab-active">
                Home
              </a>
            </li>
            <li onClick={handleClick} name="transactions">
              <a name="transactions">Transactions</a>
            </li>
            <li onClick={handleClick}>
              <a name="data-visualizer">Transaction Charts</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">ExpenTracker</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li onClick={handleClick}>
            <Link to={"/"} name="home">
              Home
            </Link>
          </li>
          <li onClick={handleClick}>
            <Link to={"/transactionHistory"} name="transactions">
              Transactions
            </Link>
          </li>
          <li onClick={handleClick}>
            <Link to={"/transactionCharts"} name="data-visualizer">
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
      </div>
    </div>
  );
}
