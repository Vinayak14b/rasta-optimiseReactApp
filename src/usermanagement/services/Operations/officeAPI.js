import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast";
import { officeendpoints } from "../apis";
import { setLoading, setOffices } from "../../slices/officeSlice";

export const getRegisteredOffices = (office_level, is_register) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch(setLoading(true));

    let result = [];
    try {
      const response = await apiConnector(
        "GET",
        officeendpoints.GET_REGISTERED_OFFICES,
        null,
        { authorization: token },
        { office_level, is_register }
      );
      result = response?.data?.registeredOffices;
      dispatch(setOffices([...response.data?.registeredOffices]));

    } catch (error) {
      console.error('Error in getting registered offices', error);
    }
    dispatch(setLoading(false));
    return result;
  };
};

export function createOffices(data) {
  const {
    office_name,
    office_level,
    is_registered,
    subscription,
    reporting_office_name,
    state,
    isReportingExists,
  } = data;
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    const toastId = toast.loading("Loading..");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector(
        "POST",
        officeendpoints.CREATE_OFFICE,
        {
          office_name,
          office_level,
          is_registered, // Corrected variable name
          subscription,
          reporting_office_name,
          state,
          isReportingExists,
        },
        { authorization: token }
      );


      toast.success("Office Created Successfully!");
    } catch (error) {
      console.error("error message:", error.message);
      toast.error("Failed to create office");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export const getOfficeNamesByRegex = (regexData) => {
  const { officeLevel, reportingOfficeName, reportingStatus } = regexData;
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    // dispatch(setLoading(true));

    let result = [];

    try {
      const response = await apiConnector(
        "GET",
        officeendpoints.OFFICE_NAMES,
        null,
        { authorization: token },
        {
          reporting_office_name: reportingOfficeName,
          office_level: officeLevel,
          isReportingExists: reportingStatus,
        }
      );

      result = response?.data;
      // dispatch(setOffices([...response.data]));

    } catch (error) {
      console.error("no reporting office available", error);
    }
    // dispatch(setLoading(false));
    return result;
  };
};

export const getOfficeDetails = (office_id) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch(setLoading(true));
    let result = [];
    try {
      const response = await apiConnector(
        "GET",
        officeendpoints.GET_OFFICE_DETAILS,
        null,
        { authorization: token },
        { office_id }
      );
      result = response?.data;

    } catch (error) {
      console.error('Error in getting offices data', error);
    }
    dispatch(setLoading(false));
    return result;
  };
};

export const getStateList = () => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch(setLoading(true));
    let result = [];
    try {
      const response = await apiConnector(
        "GET",
        officeendpoints.GET_STATE_LIST,
        null,
        { authorization: token }
      );

      result = response?.data;

    } catch (error) {
      console.error('Error in getting state list', error);
    }
    dispatch(setLoading(false));
    return result;
  };
};

// owner cal delete office directly
export const deleteOffice = (office_id) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch(setLoading(true));

    try {
      const response = await apiConnector(
        "POST",
        officeendpoints.DELETE_OFFICE,
        { office_id },
        { authorization: token }
      );

      toast.success("Office Deleted Successfully!");
    } catch (error) {
      console.error('Error in deleting office', error);
      toast.error("Failed to delete office");
    }
    dispatch(setLoading(false));
  };
};

// admin will send request to delete office
export const requestForDeletingOffice = (office_id) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch(setLoading(true));

    try {
      const response = await apiConnector(
        "POST",
        officeendpoints.DELETE_OFFICE_REQUEST,
        { office_id },
        { authorization: token }
      );

      toast.success("Request for deleting office sent successfully!");
    } catch (error) {
      console.error('Error in deleting office', error);
      toast.error("Failed to send request for deleting office");
    }
    dispatch(setLoading(false));
  };
};
