import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Broker } from "./components/Broker.jsx";
import { Diamond } from "./components/Diamond.jsx";
import { TransactionPage } from "./components/TransactionPage.jsx";
import { Provider } from "react-redux";
import { store } from "./store/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Broker />,
      },
      {
        path: "/diamond",
        element: <Diamond />,
      },
      {
        index: true,
        path: "/transaction",
        element: <TransactionPage />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
