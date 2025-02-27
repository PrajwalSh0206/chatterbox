import { useState } from "react";
import PasswordInput from "../password-input/PasswordInput";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate } from "react-router";

const Login = () => {
  const { login } = useAuth();
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  let navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login({ username, password });
      console.log("Login Successfully");
      navigate("/chat");
    } catch (err) {
      console.error("Error", err);
    }
  };

  return (
    <form className="w-full flex flex-col space-y-3">
      <div className="flex items-center space-x-2 border-2 border-gray-500 rounded-md w-full p-2">
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          className=" w-full outline-none rounded-md placeholder-gray-500"
          placeholder="Enter a username"
        ></input>
      </div>

      <PasswordInput setText={setPassword} text={password}></PasswordInput>

      <button
        disabled={password == "" || username == ""}
        onClick={handleLogin}
        type="button"
        className="bg-gray-700 disabled:bg-gray-500 rounded-md transition-all transform active:scale-95 text-white p-3 text-center w-full"
      >
        Join
      </button>
    </form>
  );
};

export default Login;
