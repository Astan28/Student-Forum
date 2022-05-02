/* eslint-disable import/no-anonymous-default-export */
import {
  FETCH_POSTS,
  FETCH_POST,
  NEW_POST,
  UPDATE_POST,
  DELETE_POST,
} from "../actions/types";

const initialState = {
  items: [],
  item: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        items: action.payload,
      };
    case FETCH_POST:
      return {
        ...state,
        item: action.payload,
      };
    case NEW_POST:
      return {
        ...state,
        item: action.payload,
      };
    case UPDATE_POST:
      return {
        ...state,
        item: action.payload,
      };
    case DELETE_POST:
      return {
        ...state,
        item: action.payload,
      };
    default:
      return state;
  }
}
