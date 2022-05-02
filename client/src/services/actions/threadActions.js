import axios from "axios";
import {
  FETCH_THREADS,
  FETCH_THREAD,
  NEW_THREAD,
  UPDATE_THREAD,
  DELETE_THREAD,
} from "./types";
import { threadUrl } from "../../config/config";

export const fetchThreads = () => (dispatch) => {
  console.log("fetching");
  fetch(`${threadUrl}/threads`)
    .then((res) => res.json())
    .then((threads) =>
      dispatch({
        type: FETCH_THREADS,
        payload: threads,
      })
    );
};
export const fetchThread = (id) => async (dispatch) => {
  console.log("fetching single thread");
  await fetch(`${threadUrl}/threads/${id}`)
    .then((res) => res.json())
    .then((thread) =>
      dispatch({
        type: FETCH_THREAD,
        payload: thread,
      })
    );
};

export const createThread = (threadData) => async (dispatch) => {
  const response = await axios
    .post(`${threadUrl}/threads`, threadData)
    //   .then((response) => response.json())
    .then((thread) =>
      dispatch({
        type: NEW_THREAD,
        payload: thread,
      })
    )
    .catch((error) => {
      console.log(error);
    });
  return response;
};

export const updateThread = (threadData, id) => (dispatch) => {
  axios
    .put(`${threadUrl}/threads/${id}`, threadData)
    .then((thread) =>
      dispatch({
        type: UPDATE_THREAD,
        payload: thread,
      })
    )
    .catch((error) => {
      console.log(error);
    });
};

export const deleteThread = (id) => (dispatch) => {
  axios
    .delete(`${threadUrl}/threads/${id}`)
    //   .then((response) => response.json())
    .then((thread) =>
      dispatch({
        type: DELETE_THREAD,
        payload: thread,
      })
    )
    .catch((error) => {
      console.log(error);
    });
};
