import axios from "axios";
import { boardUrl } from "../../config/config";
import {
  FETCH_BOARDS,
  FETCH_BOARD,
  NEW_BOARD,
  UPDATE_BOARD,
  DELETE_BOARD,
} from "./types";

class UnauthorizedError extends Error {}

export const fetchBoards = () => async (dispatch) => {
  console.log("fetching");
  await axios
    .get(`${boardUrl}/boards`)
    // .then((res) => res.json())
    .then((boards) =>
      dispatch({
        type: FETCH_BOARDS,
        payload: boards,
      })
    );
};
export const fetchBoard = (id) => async (dispatch) => {
  console.log("fetching single board");
  await fetch(`${boardUrl}/boards/${id}`)
    .then((res) => res.json())
    .then((board) =>
      dispatch({
        type: FETCH_BOARD,
        payload: board,
      })
    );
};

export const createBoard = (boardData) => async (dispatch) => {
  const response = await axios
    .post(`${boardUrl}/boards`, boardData)
    //   .then((response) => response.json())
    .then((board) =>
      dispatch({
        type: NEW_BOARD,
        payload: board,
      })
    )
    .catch((error) => {
      console.log(error);
    });
  return response;
};

export const updateBoard = (boardData, id) => async (dispatch) => {
  try {
    const response = await axios
      .put(`${boardUrl}/boards/${id}`, boardData)
      //   .then((response) => response.json())
      .then((board) =>
        dispatch({
          type: UPDATE_BOARD,
          payload: board,
        })
      )
      .catch((error) => {
        console.log(error);
      });
    return response;
  } catch (e) {
    if (e.statusCode === 401) {
      throw new UnauthorizedError();
    }
  }
};

export const deleteBoard = (id) => async (dispatch) => {
  try {
    const response = await axios
      .delete(`${boardUrl}/boards/${id}`)
      //   .then((response) => response.json())
      .then((board) =>
        dispatch({
          type: DELETE_BOARD,
          payload: board,
        })
      )
      .catch((error) => {
        console.log(error);
      });
    return response;
  } catch (e) {
    if (e.statusCode === 401) {
      throw new UnauthorizedError();
    }
  }
};
