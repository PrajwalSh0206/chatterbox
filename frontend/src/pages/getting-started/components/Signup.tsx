import React, { useState } from "react";
import PasswordInput from "../../../components/inputs/PasswordInput";
import UsernameInput from "../../../components/inputs/UsernameInput";
import { Authenticator } from "../../../services/Authenticator";
import { userSignUpPayloadDto } from "../../../../dto/apiService.dto";
import CustomError from "../../../services/CustomError";
import { REGEX } from "../../../constants/common";
import { useDispatch } from "react-redux";
import { enableSnackbar } from "../../../store/reducers/snackBarReducer";

interface signupDto {
  setPageType: any;
}

const Signup: React.FC<signupDto> = ({ setPageType }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
      <PasswordInput password={confirmPassword} setPassword={setConfirmPassword} placeholder="Confirm password"></PasswordInput>
      <button onClick={(e) => handleSignup(e)}>Sign Up</button>
    </form>
  );
};

export default Signup;
