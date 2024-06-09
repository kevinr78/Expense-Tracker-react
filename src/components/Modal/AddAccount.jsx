import React from "react";
import Input from "../Input.jsx";
import { Form } from "react-router-dom";
export default function AddAccount() {
  function addActiveClass(e) {
    const isCashExpenseClicked = e.target.name === "cash";
    if (isCashExpenseClicked) {
      e.target.classList.toggle("tab-active");
      document.getElementById("bank-account").classList.remove("tab-active");
    } else {
      e.target.classList.toggle("tab-active");
      document.getElementById("cash").classList.remove("tab-active");
    }
  }
  return (
    <div>
      <form method="POST">
        <input name="addAccount" hidden defaultValue="add-account-modal" />
        <Input
          type="text"
          placeholder="Account Name"
          name="account-name"
          className="input input-bordered input-lg w-full border-b-8 my-10"
          /*  onChange={onDataInput} */
        />
        <select className="select select-bordered w-full " name="account-type">
          <option disabled selected>
            Pick your account type
          </option>
          <option>Cash</option>
          <option>Bank Account</option>
        </select>
        <Input
          type="number"
          placeholder="Amount"
          name="acc-amount"
          className="input input-bordered input-lg w-full border-b-8 my-10"
          /*   onChange={onDataInput} */
        />

        <button className="btn mt-4 mr-2" onClick={onSave}>
          Save Account
        </button>
        <button
          className="btn mt-4"
          onClick={() => {
            document.getElementById("my_modal_1").close();
          }}
        >
          Close
        </button>
      </form>
    </div>
  );
}
