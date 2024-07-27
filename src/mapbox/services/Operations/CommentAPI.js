import { apiConnector } from "../../../usermanagement/services/apiConnector";
import { pointDetailComments } from "../apis";

export const sendCommentData = (inputValue, commentData) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    try {
      const response = await apiConnector(
        "POST",
        pointDetailComments.SEND_COMMENT_TO_DATABASE,
        {
          comment: inputValue,
		  office_level:commentData.officeLevel,
          currentChainage: commentData.currentChainage,
          drivingCoords: commentData.drivingCoords,
          roadName: commentData.roadName,
          roadNo: commentData.roadNo,
          username: commentData.username,
          // user_type:commentData.user_type,
          // user_details:commentData.user_details,
        },
        { authorization: token }
      );
    } catch (error) {
      console.error("Error in Adding the Comment", error);
    }
    return true
  };
};

export const getCommentForPoint = (commentData) => {
  const lat = commentData.drivingCoords[0];
  const long = commentData.drivingCoords[1];
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    // const toastId = toast.loading('Loading..');
    let result = [];
    try {
      const response = await apiConnector(
        "GET",
        pointDetailComments.GET_COMMENTS_FROM_DATABASE,
        null,
        { authorization: token },
        {
          roadName: commentData.roadName,
          roadNo: commentData.roadNo,
          currentChainage: commentData.currentChainage,
          lat: lat,
          long: long,
        }
      );

      if (response.status === 200) {
        result = response?.data;
      }
    } catch (error) {
      console.error('Error in getting Points', error);
    }
    return result;
  };
};
