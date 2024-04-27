import React, { useState } from "react";
import PasswordInput from "../../../components/inputs/PasswordInput";
import UsernameInput from "../../../components/inputs/UsernameInput";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
      <div className="checkbox">
        <input type="checkbox" name="" id="" />
        <p>Remember Me</p>
      </div>
      <button>Join</button>
    </form>
  );
};

export default Login;
