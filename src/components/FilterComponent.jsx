import { CATEGORIES } from "../components/utils/expenseCategories.js";
import { useRef } from "react";
import { useTransactionContext } from "./Providers/TransactionContext.jsx";

export default function FilterComponent({ onFilter, onClick, resetPage }) {
  const dateFrom = useRef(null);
  const dateTo = useRef(null);
  const category = useRef(null);
  const type = useRef(null);
  const { transactions, setTransactions } = useTransactionContext();

  function resetFilter() {
    dateFrom.current.value = "";
    dateTo.current.value = "";
    category.current.selectedIndex = 0;
    type.current.selectedIndex = 0;
    resetPage();
  }
  return (
    <div className="collapse collapse-arrow border border-base-300 bg-base-200 px-10 mb-4">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">
        <h1 className="text-2xl font-bold ">Filter</h1>
      </div>
      <div className="collapse-content">
        <div className="flex gap-5 items-end">
          <label className="form-control w-1/4 max-w-xs">
            <div className="label">
              <span className="label-text">Start Date</span>
            </div>
            <input
              ref={dateFrom}
              type="date"
              name="startDate"
              onChange={onFilter}
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control w-1/4 max-w-xs">
            <div className="label">
              <span className="label-text">End Date</span>
            </div>
            <input
              ref={dateTo}
              type="date"
              onChange={onFilter}
              name="endDate"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <select
            ref={category}
            className="select select-bordered "
            required
            onChange={onFilter}
            name="category"
            defaultValue={0}
          >
            {CATEGORIES.map((category, idx) => {
              return (
                <option
                  key={idx}
                >{`${category.emoji} ${category.name}`}</option>
              );
            })}
          </select>
          <select
            ref={type}
            className="select select-bordered "
            required
            onChange={onFilter}
            name="type"
            defaultValue={0}
          >
            <option selected disabled>
              Type
            </option>
            <option>Income</option>
            <option>Expense</option>
          </select>
        </div>
        <button className="btn mt-2 btn-accent" onClick={onClick}>
          Search
        </button>
        <button className="btn mt-2 ml-2 btn-accent" onClick={resetFilter}>
          Clear Filters
        </button>
      </div>
    </div>
  );
}
