import { useState } from "react";
import PasswordInput from "../password-input/PasswordInput";
import Validation from "../../../../components/validation/Validation";
import { VALIDATION_REGEX } from "../../../../constants";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate } from "react-router";

const SignUp = () => {
  const [username, setUserName] = useState("");

  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState(true);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState(true);

  const { signUp } = useAuth();
  let navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      await signUp({ username, password, repeat_password: confirmPassword });
      console.log("SignUp Successfully");
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

      <PasswordInput text={password} setText={setPassword}></PasswordInput>

      {password != "" && (
        <Validation setError={setPasswordErr} value={password} validationConditions={VALIDATION_REGEX.LOGIN_PAGE.PASSWORD_CONDITION}></Validation>
      )}

      <PasswordInput text={confirmPassword} setText={setConfirmPassword}></PasswordInput>

      {confirmPassword != "" && password != "" && (
        <Validation
          setError={setConfirmPasswordErr}
          value={confirmPassword}
          validationConditions={[{ message: "Password Match", regex: password }]}
        ></Validation>
      )}

      <button
        onClick={handleSignUp}
        type="button"
        disabled={confirmPasswordErr || passwordErr || username == ""}
        className="bg-gray-700 disabled:bg-gray-500 rounded-md transition-all transform active:scale-95 text-white p-3 text-center w-full"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUp;
