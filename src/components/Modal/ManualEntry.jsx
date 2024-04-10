import React from 'react'
import { useState } from "react";
import { CATEGORIES } from "../utils/expenseCategories.js";

export default function ManualEntry({children,onDataInput,onClick,activeTab}) {
  return (
    <div>
           <form method="dialog">
              <input
                type="number"
                required
                placeholder="Amount"
                name="amount"
                className="input input-bordered input-lg w-full border-b-8 my-10"
                onChange={onDataInput}
              />

              <div className="flex flex-col gap-4">
                <div role="tablist" className="tabs tabs-boxed">
                  <a
                    role="tab"
                    onClick={onClick}
                    name="income"
                    className={`tab ${
                      activeTab === "income" ? "tab-active" : null
                    }`}
                  >
                    Income
                  </a>
                  <a
                    role="tab"
                    onClick={onClick}
                    name="expense"
                    className={`tab ${
                      activeTab === "expense" ? "tab-active" : null
                    }`}
                  >
                    Expense
                  </a>
                </div>
                <input
                  type="date"
                  className="input input-bordered w-full"
                  name="date"
                  required
                  onChange={onDataInput}
                />
                <input
                  type="text"
                  placeholder="Description"
                  name="description"
                  className="input input-bordered w-full"
                  required
                  onChange={onDataInput}
                />
                <select
                  className="select select-bordered "
                  required
                  name="category"
                  defaultValue={0}
                  onChange={onDataInput}
                >
                  <option disabled >
                    Category
                  </option>
                  {CATEGORIES.map((category, idx) => {
                    return (
                      <option
                        key={idx}
                      >{`${category.emoji} ${category.name}`}</option>
                    );
                  })}
                </select>
              </div>
              {children}
            </form>
    </div>
  )
}
