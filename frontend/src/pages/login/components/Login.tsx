import React from "react";
import PasswordInput from "../../../components/inputs/Password";
import UsernameInput from "../../../components/inputs/Username";

const Login: React.FC = () => {
  return (
    <form>
      <UsernameInput></UsernameInput>
      <PasswordInput placeholder="Enter password"></PasswordInput>
      <div className="checkbox">
        <input type="checkbox" name="" id="" />
        <p>Remember Me</p>
      </div>
      <button>Join</button>
    </form>
  );
};

export default Login;
