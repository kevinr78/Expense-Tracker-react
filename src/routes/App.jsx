import { useState, useEffect } from "react";
import Modal from "../components/Modal/Modal.jsx";
import Header from "../components/Header.jsx";
import TransactionProvider from "../components/Providers/TransactionContext.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import AuthProvider from "../components/Providers/AuthProvider.jsx";

function App() {
  const [activeModal, setActiveModal] = useState("manual_entry");
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
    <div>
      <TransactionProvider>
        <Header />
        <Outlet context={[activeModal, setActiveModal]} />
        <Modal toastData={showToast} activeTab={activeModal} />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
        />
      </TransactionProvider>
    </div>
  );
}

export default App;
