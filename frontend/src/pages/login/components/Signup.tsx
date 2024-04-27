import React from "react";
import PasswordInput from "../../../components/inputs/Password";
import UsernameInput from "../../../components/inputs/Username";

const Signup: React.FC = () => {
  return (
    <form>
      <UsernameInput></UsernameInput>
      <PasswordInput placeholder="Enter password"></PasswordInput>
      <PasswordInput placeholder="Confirm password"></PasswordInput>

      <button>Sign Up</button>
    </form>
  );
};

export default Signup;
