import Axios from "../../api/api";

import {
  FETCH_MAINTENANCE_REQUEST,
  FETCH_MAINTENANCE_SUCCESS,
  FETCH_MAINTENANCE_FAILURE,
  CREATE_MAINTENANCE_REQUEST,
  CREATE_MAINTENANCE_SUCCESS,
  CREATE_MAINTENANCE_FAILURE,
  UPDATE_MAINTENANCE_REQUEST,
  UPDATE_MAINTENANCE_SUCCESS,
  UPDATE_MAINTENANCE_FAILURE,
} from "../constants/maintenance";

const createMaintenanceRequest = () => ({ type: CREATE_MAINTENANCE_REQUEST });
const createMaintenanceSuccess = (payload) => ({ type: CREATE_MAINTENANCE_SUCCESS, payload });
const createMaintenanceFailure = (errors) => ({ type: CREATE_MAINTENANCE_FAILURE, errors });

export const createMaintenance = (data) => async (dispatch) => {
  dispatch(createMaintenanceRequest());
  try {
    const response = await Axios.post("/maintenance-requests",data);
    if (response?.status === 200) {
      return dispatch(createMaintenanceSuccess(response?.data));
    }
    return dispatch(createMaintenanceFailure(response?.data?.message));
  } catch (e) {
    return dispatch(createMaintenanceFailure(e));
  }
};

const fetchMaintenanceRequest = () => ({ type: FETCH_MAINTENANCE_REQUEST });
const fetchMaintenanceSuccess = (payload) => ({ type: FETCH_MAINTENANCE_SUCCESS, payload });
const fetchMaintenanceFailure = (errors) => ({ type: FETCH_MAINTENANCE_FAILURE, errors });

export const fetchMaintenance = () => async (dispatch) => {
  dispatch(fetchMaintenanceRequest());
  try {
    const response = await Axios.get("/maintenance-requests");
    if (response?.status === 200) {
      return dispatch(fetchMaintenanceSuccess(response?.data?.data));
    }
    return dispatch(fetchMaintenanceFailure(response?.data?.message));
  } catch (e) {
    return dispatch(fetchMaintenanceFailure(e));
  }
};

const updateMaintenanceRequest = () => ({ type: UPDATE_MAINTENANCE_REQUEST });
const updateMaintenanceSuccess = (payload) => ({ type: UPDATE_MAINTENANCE_SUCCESS, payload });
const updateMaintenanceFailure = (errors) => ({ type: UPDATE_MAINTENANCE_FAILURE, errors });

export const updateMaintenance = (id) => async (dispatch) => {
  dispatch(updateMaintenanceRequest());
  try {
    const response = await Axios.put(`/maintenance-requests/${id}/close`);
    if (response?.status === 200) {
      return dispatch(updateMaintenanceSuccess(response?.data));
    }
    return dispatch(updateMaintenanceFailure(response?.data?.message));
  } catch (e) {
    return dispatch(updateMaintenanceFailure(e));
  }
};
