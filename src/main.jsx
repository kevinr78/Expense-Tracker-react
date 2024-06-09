import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App.jsx";
import Authentication, {
  action as AuthAction,
} from "./routes/Registration.jsx";
import ErrorPage from "./Error.jsx";
import TransactionHistory from "./routes/TransactionHistory.jsx";
import DataVisualizer from "./routes/DataVisualizer.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FilterComponent from "./components/FilterComponent.jsx";
import Home from "./routes/Home.jsx";

import AuthProvider from "./components/Providers/AuthProvider.jsx";
import { logoutAction } from "./components/Header.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Authentication />,
    action: AuthAction,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <App />,
    errorElement: <ErrorPage />,
    /* action: AddTransactionOrAccount, */
    children: [
      { index: true, element: <Home /> },

      { path: "home", element: <App /> },

      {
        path: "transactionHistory",
        element: <TransactionHistory activeTab={"transactions"} />,
        errorElement: <ErrorPage />,
        children: [
          {
            element: <FilterComponent />,
          },
        ],
      },
      {
        path: "transactionCharts",
        element: <DataVisualizer activeTab={"data"} />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  { path: "/logout", action: logoutAction },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  /*  <React.StrictMode> */
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
