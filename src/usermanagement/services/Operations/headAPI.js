import { setLoading } from "../../slices/headSlice";
import { apiConnector } from "../apiConnector";
import { headendpoints } from "../apis";
import { toast } from "react-hot-toast";

export function assignHead(
  office_id,
  name,
  username,
  role,
  email,
  phone,
  dob,
  password,
  reassign,
  navigate
) {
  return async (dispatch, getState) => {
    // const toastId = toast.loading('Loading..');
    const { token } = getState().auth;
    dispatch(setLoading(true));

    try {
      const response = await apiConnector(
        "POST",
        headendpoints.ASSIGN_HEAD,
        {
          office_id,
          name,
          username,
          role,
          email,
          phone,
          dob,
          password,
          reassign,
        },
        { authorization: token }
      );

      // Handle success response
      // dispatch(setToken(response.data.token));
      toast.success("Head Added Successfully");
      // navigate('/office');
    } catch (error) {
      // Handle error
      console.error('Error message:', error.message);
      toast.error("Failed to add Head");
    }
    // Cleanup actions
    dispatch(setLoading(false));
    // toast.dismiss(toastId);
  };
}

export const deleteHeadByOwner = (username) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch(setLoading(true));

    try {
      const response = await apiConnector(
        "POST",
        headendpoints.DEL_HEAD_BY_OWNER,
        { username },
        { authorization: token }
      );

      toast.success("Head Deleted Successfully");
    } catch (error) {
      toast.error("Failed to delete Head");
    }
    // Cleanup actions
    dispatch(setLoading(false));
  };
};
