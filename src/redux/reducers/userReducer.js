import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
  } from "../constants/user";
  
  const initialState = {
    data: null,
    loading: false,
    errors: [],
    message: null,
    section: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_USER_REQUEST:
        return { ...state, loading: true };
      case LOGIN_USER_SUCCESS:
        return { ...state, loading: false, message: action.payload, errors: [] };
      case LOGIN_USER_FAILURE:
        return { ...state, loading: false, errors: action.errors };
  
      default:
        return state;
    }
  };
  
  export default userReducer;