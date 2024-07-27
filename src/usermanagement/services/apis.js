// const BASE_URL = process.env.REACT_APP_BASE_LINK
// const BASE_URL = 'http://localhost:2700/';
import { BASE_URL } from "../../apiConnection";

export const authendpoints = {
  // OWNER_LOGIN: `${BASE_URL}/owner/login`,
  // USER_LOGIN: `${BASE_URL}/user/login`,
  // JE_LOGIN: `${BASE_URL}/login`,
  LOGIN: `${BASE_URL}user-login`,
};

export const ownerendpoints = {
  GET_OWNER_DETAILS: `${BASE_URL}owner/owner-details-via-username`,
  // APPROVE_DELETE_PROFILE: `${BASE_URL}user/approve-delete`,
  GET_UTILITY_REQUESTS: `${BASE_URL}owner/get-utility-requests`,
  APPROVE_UTILITY_REQUEST: `${BASE_URL}owner/approvel-delete-from-utility-owner`,
};

export const officeendpoints = {
  GET_REGISTERED_OFFICES: `${BASE_URL}office/register`,
  CREATE_OFFICE: `${BASE_URL}office/create`,
  OFFICE_NAMES: `${BASE_URL}office/get-office-name-regex`,
  GET_OFFICE_DETAILS: `${BASE_URL}office/detail`,
  GET_OFFICE_DETAILS_BY_USERNAME: `${BASE_URL}office/get-office-details`,
  GET_STATE_LIST: `${BASE_URL}office/get-state-list`,
  DELETE_OFFICE: `${BASE_URL}office/delete`,
  DELETE_OFFICE_REQUEST: `${BASE_URL}office/request-for-deleting-office`,
};

export const headendpoints = {
  ASSIGN_HEAD: `${BASE_URL}office/assign-head`,
  DEL_HEAD_BY_OWNER: `${BASE_URL}office/delete-head-by-owner`,
};

export const adminendpoints = {
  ASSIGN_ADMIN: `${BASE_URL}office/assign-admin`,
  DEL_ADMIN_REQ_OWNER: `${BASE_URL}user/delete-admin-request`,
  DEL_OFFICE_REQ_OWNER: `${BASE_URL}user/delete-office-request`,
  DEL_ADMIN_BY_OWNER: `${BASE_URL}office/delete-admin-by-owner`,
};

export const memberendpoints = {
  ASSIGN_MEMBER: `${BASE_URL}office/assign-member`,
  DEL_MEMBER: `${BASE_URL}user/delete-office-request`,
  CHANGE_PASS: `${BASE_URL}user/change-password`,
};

export const tripapprovalendpoints = {
  GET_TRIP_DATA: `${BASE_URL}getTripsdDta`,
  APPROVE_STATUS: `${BASE_URL}ApprovalStatus`,
};

export const profileendpoints = {
  GET_JUSRIDICTION_DATA: `${BASE_URL}csv/get-areas-under-user`,
  GET_USER_DATA_BY_USERNAME: `${BASE_URL}office/get-user-data`,
  // setting all je data
  GET_ALL_VERIFIED_PROFILES: `${BASE_URL}v1/all-verified-profiles`,
  GET_JE_DATA_UNDER_ADMIN_OWNER: `${BASE_URL}v1/user-verified-data`,
  GET_ALL_UNVERFIED_USERS: `${BASE_URL}v1/unverifiedData`,
  GET_SINGLE_UNIVERIFIED_REQUEST_DATA: `${BASE_URL}v1/getUnverifiedProfile`,
  VERIFY_SINGLE_USER: `${BASE_URL}v1/verifyUser`,
  DELETE_VERIFIED_USER: `${BASE_URL}v1/delete-verifed-user`,
};

export const reportendpoints = {
  GET_OVERVIEW_REPORT_DETAILS: `${BASE_URL}report/get-generate-report`,
  GET_LIST_OF_ROADS: `${BASE_URL}AI/getRoadListByAccess2`,
  GET_DETAIL_OF_EACH_ROAD: `${BASE_URL}report/get-detailed-report-test`,
  GET_DETAIL_OF_CHAINAGE: `${BASE_URL}api/getChainageWiseData`,
  GET_AUTHORITY: `${BASE_URL}csv/higher-authorities`,
};