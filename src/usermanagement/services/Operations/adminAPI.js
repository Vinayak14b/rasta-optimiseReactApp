import { setLoading } from "../../slices/adminSlice";
import { apiConnector } from "../apiConnector";
import { adminendpoints } from "../apis";
import { toast } from "react-hot-toast";
import { REQUEST_TYPE, STATUS } from "../../data/constantdata";
// import {office} from '../usermanagement\core\Office\Member\ViewMember.jsx'

export function assignAdmin(
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
        adminendpoints.ASSIGN_ADMIN,
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
      toast.success("Admin Added Successfully");
      // navigate('/office');
    } catch (error) {
      // Handle error
      toast.error("Failed to add Admin");
    }
    // Cleanup actions
    dispatch(setLoading(false));
    // toast.dismiss(toastId);
  };
}

// delete admin request to owner
export function deleteAdminReqtoOwner(office_id) {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    dispatch(setLoading(true));

    try {
      const response = await apiConnector(
        "POST",
        adminendpoints.DEL_ADMIN_REQ_OWNER,
        {
          request_type: REQUEST_TYPE.DELETE_PROFILE,
          office_id,
          status: STATUS.STATUS_TYPE,
        },
        { authorization: token }
      );

      toast.success("Delete Request to Admin Successfully");
    } catch (error) {
      toast.error("Failed to Send Delete Request to Admin ");
    }
    dispatch(setLoading(false));
  };
}

// delete office request to owner
export function deleteOfficeReqtoOwner(office_id) {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch(setLoading(true));

    try {
      const response = await apiConnector(
        "POST",
        adminendpoints.DEL_OFFICE_REQ_OWNER,
        {
          request_type: REQUEST_TYPE.DELETE_OFFICE,
          office_id,
          status: STATUS.STATUS_TYPE,
        },
        { authorization: token }
      );
      if (response.status === 200) {
        toast.success("Delete Office Request sent Successfully ");
      }

    } catch (error) {
      console.error("Error Message : ",error.message);
    }

    dispatch(setLoading(false));
  };
}

// delete admin by owner
export function deleteAdminByOwner(username) {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch(setLoading(true));

    try {
      const response = await apiConnector(
        "POST",
        adminendpoints.DEL_ADMIN_BY_OWNER,
        { username },
        { authorization: token }
      );

      toast.success("Admin Deleted Successfully");
    } catch (error) {
      toast.error("Failed to delete Admin");
    }
    dispatch(setLoading(false));
  };
}
