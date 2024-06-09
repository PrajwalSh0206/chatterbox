import React, { useState } from "react";
import PasswordInput from "../../../components/inputs/PasswordInput";
import UsernameInput from "../../../components/inputs/UsernameInput";
import { Authenticator } from "../../../services/Authenticator";
import { REGEX } from "../../../constants/common";
import CustomError from "../../../services/CustomError";
import { enableSnackbar } from "../../../store/reducers/snackBarReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeUserDetails } from "../../../store/reducers/userReducer";
import { userSignUpPayloadDto } from "../../../dto/apiService";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const payload: userSignUpPayloadDto = {
        username,
        password,
      };
      const authObj = new Authenticator();
      const response = await authObj.login(payload);
      if (REGEX.SUCCESS_CODE.test(response.status.toString())) {
        dispatch(storeUserDetails({ username }));
        setUsername("");
        setPassword("");
        localStorage.setItem("token", response.data.token);
        navigate("/chat");
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
      <div className="checkbox">
        <input type="checkbox" name="" id="" />
        <p>Remember Me</p>
      </div>
      <button onClick={handleLogin}>Join</button>
    </form>
  );
};

export default Login;
