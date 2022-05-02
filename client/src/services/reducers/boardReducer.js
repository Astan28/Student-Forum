/* eslint-disable import/no-anonymous-default-export */
import {
  FETCH_BOARDS,
  FETCH_BOARD,
  NEW_BOARD,
  UPDATE_BOARD,
  DELETE_BOARD,
} from "../actions/types";

const initialState = {
  items: [],
  item: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_BOARDS:
      return {
        ...state,
        items: action.payload,
      };
    case FETCH_BOARD:
      return {
        ...state,
        item: action.payload,
      };
    case NEW_BOARD:
      return {
        ...state,
        item: action.payload,
      };
    case UPDATE_BOARD:
      return {
        ...state,
        item: action.payload,
      };
    case DELETE_BOARD:
      return {
        ...state,
        item: action.payload,
      };
    default:
      return state;
  }
}
