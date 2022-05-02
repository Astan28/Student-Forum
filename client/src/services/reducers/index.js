import { combineReducers } from "redux";
// import sectionReducer from './sectionReducer';
import authReducer from "./authReducer";

export default combineReducers({
  // sections: sectionReducer,
  authReducer,
});
