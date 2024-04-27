import React, { useState } from "react";
import PasswordInput from "../../../components/inputs/PasswordInput";
import UsernameInput from "../../../components/inputs/UsernameInput";

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <form>
      <UsernameInput
        username={username}
        setUsername={setUsername}
      ></UsernameInput>
      <PasswordInput
        password={password}
        setPassword={setPassword}
        placeholder="Enter password"
      ></PasswordInput>
      <PasswordInput
        password={confirmPassword}
        setPassword={setConfirmPassword}
        placeholder="Confirm password"
      ></PasswordInput>

      <button>Sign Up</button>
    </form>
  );
};

export default Signup;
