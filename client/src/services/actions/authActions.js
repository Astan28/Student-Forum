import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
// import { SET_CURRENT_USER, UPDATE_USER } from "./types";
import {
  SET_CURRENT_USER,
  UPDATE_USER,
  FETCH_USER,
  FETCH_USERS,
  NEW_USER,
  DELETE_USER,
} from "./types";

import jwt from "jsonwebtoken";
import { userUrl } from "../../config/config";

class UnauthorizedError extends Error {}

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}
export function logout() {
  return (dispatch) => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
  };
}

export const login = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${userUrl}/users/login`, data);

    console.log(response.data);
    const { token } = response.data;
    console.log(token);
    localStorage.setItem("jwtToken", token);
    setAuthToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
    console.log("res", response);
    return response;
  } catch (e) {
    if (e.statusCode === 401) {
      throw new UnauthorizedError();
    }
  }
};

export const fetchUsers = () => (dispatch) => {
  console.log("fetching");
  fetch(`${userUrl}/users`)
    .then((res) => res.json())
    .then((users) =>
      dispatch({
        type: FETCH_USERS,
        payload: users,
      })
    );
};
export const fetchUser = (id) => async (dispatch) => {
  console.log("fetching single user");
  await fetch(`${userUrl}/users/${id}`)
    .then((res) => res.json())
    .then((user) =>
      dispatch({
        type: FETCH_USER,
        payload: user,
      })
    );
};

export const createUser = (userData) => (dispatch) => {
  axios
    .post(`${userUrl}/users/register`, userData)
    //   .then((response) => response.json())
    .then((user) =>
      dispatch({
        type: NEW_USER,
        payload: user,
      })
    )
    .catch((error) => {
      console.log(error);
    });
};

export const deleteUser = (id) => (dispatch) => {
  axios
    .delete(`${userUrl}/users/${id}`)
    //   .then((response) => response.json())
    .then((user) =>
      dispatch({
        type: DELETE_USER,
        payload: user,
      })
    )
    .catch((error) => {
      console.log(error);
    });
};

export const updateUser = (userData, id) => (dispatch) => {
  axios
    .put(`${userUrl}/users/${id}`, userData)
    //   .then((response) => response.json())
    .then((user) =>
      dispatch({
        type: UPDATE_USER,
        payload: user,
      })
    )
    .catch((error) => {
      console.log(error);
    });
};
