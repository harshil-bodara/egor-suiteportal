import Axios from "../../api/api";

import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
} from "../constants/user";

const loginUserRequest = () => ({ type: LOGIN_USER_REQUEST });
const loginUserSuccess = (payload) => ({ type: LOGIN_USER_SUCCESS, payload });
const loginUserFailure = (errors) => ({ type: LOGIN_USER_FAILURE, errors });

export const loginUser = (data) => async (dispatch) => {
  dispatch(loginUserRequest());
  try {
    const response = await Axios.post("/admin/login",data);
    if (response?.status === 200) {
      return dispatch(loginUserSuccess(response?.data));
    }
    return dispatch(loginUserFailure(response?.data?.message));
  } catch (e) {
    return dispatch(loginUserFailure(e));
  }
};
