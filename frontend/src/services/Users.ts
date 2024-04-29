import { API_URL } from "../constants/url";
import AxiosHandler from "./AxiosHandler";

export class UserApiService {
  async getUser(payload: any, token: string) {
    const url = API_URL.GET_USER;
    const axiosObj = new AxiosHandler();
    const response = await axiosObj.callAxios("GET_USER", url, payload, "GET", token);
    return response;
  }
}
