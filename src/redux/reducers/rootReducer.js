import { combineReducers } from "redux";

import user from "./userReducer";
import maintenance from "./maintenanceReducer";

const rootReducer = combineReducers({
  user: user,
  maintenance:maintenance
});

export default rootReducer;