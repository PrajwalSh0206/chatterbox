import React, { useState } from "react";
import PasswordInput from "../../../components/inputs/PasswordInput";
import UsernameInput from "../../../components/inputs/UsernameInput";
import { Authenticator } from "../../../services/Authenticator";
import { userSignUpPayloadDto } from "../../../../dto/apiService";
import CustomError from "../../../services/CustomError";
import { REGEX, VALIDATION } from "../../../constants/common";
import { useDispatch } from "react-redux";
import { enableSnackbar } from "../../../store/reducers/snackBarReducer";
import Validation from "../../../components/error/Validation";

interface signupDto {
  setPageType: any;
}

const Signup: React.FC<signupDto> = ({ setPageType }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confPasswordErr, setConfPasswordErr] = useState(true);

  const dispatch = useDispatch();

  const handleSignup = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const payload: userSignUpPayloadDto = {
        username,
        password,
      };
      const authObj = new Authenticator();
      const response = await authObj.signup(payload);
      if (REGEX.SUCCESS_CODE.test(response.status.toString())) {
        const payload = {
          message: response.data.message,
          visible: true,
        };
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        dispatch(enableSnackbar(payload));
        setPageType("login");
      }
    } catch (error) {
      console.error(error);
      let snackBarpayload = {
        message: "Api Failed In SignUp With Status 500",
        visible: true,
      };
      if (error instanceof CustomError) {
        snackBarpayload.message = error.message;
      }
      dispatch(enableSnackbar(snackBarpayload));
    }
  };

  return (
    <form>
      <UsernameInput username={username} setUsername={setUsername}></UsernameInput>
      <PasswordInput password={password} setPassword={setPassword} placeholder="Enter password"></PasswordInput>
      {password != "" && <Validation setError={setPasswordErr} value={password} validationConditions={VALIDATION.LOGIN_PAGE.PASSWORD_CONDITION}></Validation>}
      <PasswordInput password={confirmPassword} setPassword={setConfirmPassword} placeholder="Confirm password"></PasswordInput>
      {confirmPassword != "" && password != "" && (
        <Validation setError={setConfPasswordErr} value={confirmPassword} validationConditions={[{ message: "Password Match", regex: password }]}></Validation>
      )}

      <button disabled={passwordErr || confPasswordErr} onClick={(e) => handleSignup(e)}>
        Sign Up
      </button>
    </form>
  );
};

export default Signup;
