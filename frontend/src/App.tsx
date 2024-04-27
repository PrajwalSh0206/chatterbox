import React from "react";
import "./App.scss";
import "./scss/common.scss";
import { Outlet } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="container">
      <Outlet></Outlet>
    </div>
  );
};

export default App;
