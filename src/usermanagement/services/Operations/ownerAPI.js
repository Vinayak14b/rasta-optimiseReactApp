import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast";
import { ownerendpoints } from "../apis";
import { setLoading } from "../../slices/ownerSlice";

export const getOwnerDetails = (owner_username) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch(setLoading(true));
    let result = [];
    try {
      const response = await apiConnector(
        "GET",
        ownerendpoints.GET_OWNER_DETAILS,
        null,
        { authorization: token },
        { username: owner_username }
      );

      result = response?.data;

    } catch (error) {
      console.error('Error in getting owner data', error);
    }
    dispatch(setLoading(false));
    return result;
  };
};