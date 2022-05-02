import axios from "axios";
import {
  FETCH_POST,
  FETCH_POSTS,
  NEW_POST,
  UPDATE_POST,
  DELETE_POST,
} from "./types";
import { postUrl } from "../../config/config";

export const fetchPosts = () => (dispatch) => {
  console.log("fetching");
  fetch(`${postUrl}/posts`)
    .then((res) => res.json())
    .then((posts) =>
      dispatch({
        type: FETCH_POSTS,
        payload: posts,
      })
    );
};
export const fetchPost = (id) => async (dispatch) => {
  console.log("fetching single post");
  await fetch(`${postUrl}/posts/${id}`)
    .then((res) => res.json())
    .then((post) =>
      dispatch({
        type: FETCH_POST,
        payload: post,
      })
    );
};

export const createPost = (postData) => async (dispatch) => {
  const response = await axios
    .post(`${postUrl}/posts`, postData)
    //   .then((response) => response.json())
    .then((post) =>
      dispatch({
        type: NEW_POST,
        payload: post,
      })
    )
    .catch((error) => {
      console.log(error);
    });
  return response;
};

export const updatePost = (postData, id) => (dispatch) => {
  axios
    .put(`${postUrl}/posts/${id}`, postData)
    //   .then((response) => response.json())
    .then((post) =>
      dispatch({
        type: UPDATE_POST,
        payload: post,
      })
    )
    .catch((error) => {
      console.log(error);
    });
};

export const deletePost = (id) => (dispatch) => {
  axios
    .delete(`${postUrl}/posts/${id}`)
    //   .then((response) => response.json())
    .then((post) =>
      dispatch({
        type: DELETE_POST,
        payload: post,
      })
    )
    .catch((error) => {
      console.log(error);
    });
};
