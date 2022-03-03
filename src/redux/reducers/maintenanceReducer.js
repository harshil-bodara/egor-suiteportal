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

const initialState = {
  data: null,
  loading: false,
  errors: [],
  message: null,
  section: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MAINTENANCE_REQUEST:
      return { ...state, loading: true };
    case FETCH_MAINTENANCE_SUCCESS:
      return { ...state, loading: false, data: action.payload, errors: [] };
    case FETCH_MAINTENANCE_FAILURE:
      return { ...state, loading: false, errors: action.errors };

    case CREATE_MAINTENANCE_REQUEST:
      return { ...state, loading: true };
    case CREATE_MAINTENANCE_SUCCESS:
      return { ...state, loading: false, message: action.payload, errors: [] };
    case CREATE_MAINTENANCE_FAILURE:
      return { ...state, loading: false, errors: action.errors };

    case UPDATE_MAINTENANCE_REQUEST:
      return { ...state, loading: true };
    case UPDATE_MAINTENANCE_SUCCESS:
      return { ...state, loading: false, message: action.payload, errors: [] };
    case UPDATE_MAINTENANCE_FAILURE:
      return { ...state, loading: false, errors: action.errors };

    default:
      return state;
  }
};

export default userReducer;