import axios from "axios";
import { store } from "../../redux/store/aioutputstore";
import { toast } from "react-hot-toast";

export const axiosInstance = axios.create({});

export const apiConnector = async (method, url, bodyData, headers, params) => {
  try {
    const response = await axiosInstance({
      method: method,
      url: url,
      data: bodyData ? bodyData : null,
      headers: headers ? headers : null,
      params: params ? params : null,
    });
    return response;
  } catch (error) {
    if (error.response && error.response.status === 408) {
      toast.error("Session Expired! Please login again.");
      setTimeout(() => {
        localStorage.clear();
        store.dispatch({ type: "RESET" });
        window.location.reload();
      }, 200);
    }
    throw error;
  }
};
