import { API_URL } from "../constants/url";
import { userSignUpPayloadDto } from "../../dto/apiService";
import AxiosHandler from "./AxiosHandler";

export class Authenticator {
  async signup(payload: userSignUpPayloadDto) {
    const url = API_URL.SIGNUP;
    const axiosObj = new AxiosHandler();
    const response = await axiosObj.callAxios("SIGNUP", url, payload);
    return response;
  }

  async login(payload: userSignUpPayloadDto) {
    const url = API_URL.LOGIN;
    const axiosObj = new AxiosHandler();
    const response = await axiosObj.callAxios("LOGIN", url, payload);
    return response;
  }

  async authToken(token: string) {
    const url = API_URL.AUTH_TOKEN;
    const axiosObj = new AxiosHandler();
    const response = await axiosObj.callAxios("AUTH TOKEN", url, {}, "POST", token);
    return response;
  }
}
