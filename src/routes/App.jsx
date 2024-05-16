import { useState, useEffect } from "react";
import Modal from "../components/Modal/Modal.jsx";
import Header from "../components/Header.jsx";
import Home from "./Home.jsx";
import DataVisualizer from "./DataVisualizer.jsx";
import TransactionProvider, {
  useTransactionContext,
} from "../components/TransactionContext.jsx";
import TransactionHistory from "./TransactionHistory.jsx";
import Toast from "../components/Toast.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";

function App() {
  const [manualEntryCTA, setManualEntryCTA] = useState(true);
  const [isHomeActive, setIsHomeActive] = useState("home");

  function onTabChange(value) {
    setIsHomeActive(value);
  }

  function handleChange(value) {
    if (value === "manual-entry") {
      setManualEntryCTA(true);
    } else {
      setManualEntryCTA(false);
    }
  }

  function showToast(type, message) {
    switch (type) {
      case "success":
        return toast.success(message, { theme: "dark" });

      case "warn":
        return toast.warn(message, { theme: "dark" });

      default:
        break;
    }
  }

  return (
    <div className="h-screen">
      <Header gg={onTabChange} />
      <Outlet />
      <Modal CTA={manualEntryCTA} toastData={showToast} />
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

export default App;
