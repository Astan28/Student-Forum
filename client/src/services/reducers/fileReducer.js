/* eslint-disable import/no-anonymous-default-export */
import {
  FETCH_FILES,
  FETCH_FILE,
  NEW_FILE,
  UPDATE_FILE,
  DELETE_FILE,
} from "../actions/types";

const initialState = {
  items: [],
  item: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_FILES:
      return {
        ...state,
        items: action.payload,
      };
    case FETCH_FILE:
      return {
        ...state,
        item: action.payload,
      };
    case NEW_FILE:
      return {
        ...state,
        item: action.payload,
      };
    case DELETE_FILE:
      return {
        ...state,
        item: action.payload,
      };
    default:
      return state;
  }
}
