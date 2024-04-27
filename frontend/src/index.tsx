import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import GettingStarted from "./pages/login/GettingStarted";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found in the document!");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <GettingStarted />,
      },
    ],
  },
]);

ReactDOM.createRoot(rootElement).render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);
