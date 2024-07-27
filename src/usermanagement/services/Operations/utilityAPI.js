import { apiConnector } from "../apiConnector";
import { setLoading, setUtilityData } from "../../slices/utilitySlice";
import { ownerendpoints } from "../apis";
import { toast } from "react-hot-toast";

export const getUtilityRequest = (filter_type) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch(setLoading(true));
    let result = [];
    try {
      const response = await apiConnector(
        "GET",
        ownerendpoints.GET_UTILITY_REQUESTS,
        null,
        { authorization: token },
        { filter_type }
      );

      result = response?.data.allRequests;
      dispatch(setUtilityData([...result]));
    } catch (error) {
      console.error("Error in getting utility data", error);
    }
    dispatch(setLoading(false));
    return result;
  };
};

export const approveUtilityRequest = (request_id) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    const toastId = toast.loading("Loading..");
    dispatch(setLoading(true));
    let result = [];
    try {
      const response = await apiConnector(
        "POST",
        ownerendpoints.APPROVE_UTILITY_REQUEST,
        { request_id },
        { authorization: token }
      );

      // result = response?.data;
      dispatch(getUtilityRequest());

      toast.success("Request approved successfully");
    } catch (error) {
      console.error("Error in approving utility request", error);
      toast.error("Error in approving request");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
    // return result;
  };
};
