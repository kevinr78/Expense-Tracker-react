import { CATEGORIES } from "../utils/expenseCategories.js";
import Input from "../Input.jsx";
import { useRef } from "react";
import { Form } from "react-router-dom";

export default function ManualEntry() {
  const categories = CATEGORIES.map((category, idx) => {
    return <option key={idx}>{`${category.emoji} ${category.name}`}</option>;
  });

  function addActiveClass(e) {
    const isExpenseClicked = e.target.name === "expense";
    if (isExpenseClicked) {
      e.target.classList.toggle("tab-active");
      document.getElementById("income").classList.remove("tab-active");
    } else {
      e.target.classList.toggle("tab-active");
      document.getElementById("expense").classList.remove("tab-active");
    }
  }

  return (
    <div>
      <form method="POST">
        <input
          name="insertTransaction"
          hidden
          defaultValue="add-transaction-modal"
        />
        <Input
          type="number"
          placeholder="Amount"
          name="amount"
          className="input input-bordered input-lg w-full border-b-8 my-10"
        />

        <div className="flex flex-col gap-4">
          <select
            className="select select-bordered w-full "
            name="transaction-type"
          >
            <option disabled selected>
              Expense Type
            </option>
            <option>Income</option>
            <option>Expense</option>
          </select>
          <Input type="date" name="date" />

          <Input type="text" placeholder="Description" name="description" />
          <select
            className="select select-bordered "
            required
            name="category"
            defaultValue={0}
          >
            <option disabled>Category</option>
            {CATEGORIES.map((category, idx) => {
              return (
                <option
                  key={idx}
                >{`${category.emoji} ${category.name}`}</option>
              );
            })}
          </select>
        </div>
        <button className="btn mt-4">Save</button>
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
