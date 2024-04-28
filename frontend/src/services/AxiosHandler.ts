import axios from "axios";
import CustomError from "./CustomError";

export default class AxiosHandler {
  async callAxios(apiName: string, url: string, payload: any, method: string = "POST") {
    try {
      const response = await axios({
        method,
        url,
        data: payload,
      });
      return response;
    } catch (error) {
      console.error(error);
      let errorResponse = { message: `API Failed In ${apiName} with status 500`, error: error, status: 500 };
      if (axios.isAxiosError(error)) {
        errorResponse = {
          message: error.response?.data?.message ?? errorResponse.message,
          error: error.response?.data,
          status: error.response?.status ?? errorResponse.status,
        };
      }
      console.error(errorResponse)
      throw new CustomError(errorResponse.message, errorResponse.status, errorResponse);
    }
  }
}
