import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTransactionContext } from "../Providers/TransactionContext";
import ManualEntry from "./ManualEntry";

import AddAccount from "./AddAccount";
import { useAuthContext } from "../Providers/AuthProvider";
import { sendApiRequest } from "../utils/sendApiRequest";

export default function Modal({ toastData, activeTab }) {
  const { user } = useAuthContext();
  const { transactions, setTransactions } = useTransactionContext();

  let formToBeDisplayed = null;
  if (activeTab === "add-account") {
    formToBeDisplayed = <AddAccount onSave={handleClick1} />;
  } else {
    formToBeDisplayed = (
      <ManualEntry /*  onClick={handleClick} */ activeTab={activeTab} />
    );
  }

  return createPortal(
    <>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {activeTab === "add-account" ? "New Account" : "New Transaction"}
          </h3>
          <div className="">{formToBeDisplayed}</div>
        </div>
      </dialog>
    </>,
    document.getElementById("modal-root")
  );
}
