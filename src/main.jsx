import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App.jsx";
import ErrorPage from "./Error.jsx";
import TransactionHistory from "./routes/TransactionHistory.jsx";
import TransactionProvider from "./components/TransactionContext.jsx";
import DataVisualizer from "./routes/DataVisualizer.jsx";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FilterComponent from "./components/FilterComponent.jsx";
import Home from "./routes/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/transactionHistory",
        element: <TransactionHistory activeTab={"transactions"} />,
        errorElement: <ErrorPage />,
        children: [
          {
            element: <FilterComponent />,
          },
        ],
      },
      {
        path: "/transactionCharts",
        element: <DataVisualizer activeTab={"data"} />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  /*  <React.StrictMode> */
  <>
    <TransactionProvider>
      <RouterProvider router={router} />
    </TransactionProvider>
  </>
  /*  </React.StrictMode> */
);
