import {
  SET_CURRENT_USER,
  UPDATE_USER,
  FETCH_USER,
  FETCH_USERS,
  NEW_USER,
  DELETE_USER,
} from "../actions/types";
import isEmpty from "lodash/isEmpty";

const initialState = {
  isAuthenticated: false,
  user: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user,
      };
    case UPDATE_USER:
      return {
        ...state,
        item: action.payload,
      };
    case NEW_USER:
      return {
        ...state,
        item: action.payload,
      };
    case DELETE_USER:
      return {
        ...state,
        item: action.payload,
      };
    case FETCH_USERS:
      return {
        ...state,
        items: action.payload,
      };
    case FETCH_USER:
      return {
        ...state,
        item: action.payload,
      };

    default:
      return state;
  }
};
