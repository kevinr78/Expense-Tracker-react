import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Toast() {
  return (
    <div className="toast">
      <div className="alert alert-info">
        <span>New message arrived.</span>
      </div>
    </div>
  );
}
