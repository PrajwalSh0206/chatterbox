import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import Login from "./pages/login/Login";

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
        element: <Login></Login>,
      },
    ],
  },
]);

ReactDOM.createRoot(rootElement).render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);
