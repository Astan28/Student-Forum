import axios from "axios";
import { FETCH_FILES, FETCH_FILE, NEW_FILE, DELETE_FILE } from "./types";
import { fileUrl } from "../../config/config";

export const fetchFiles = () => (dispatch) => {
  console.log("fetching");
  fetch(`${fileUrl}/files`)
    .then((res) => res.json())
    .then((files) =>
      dispatch({
        type: FETCH_FILES,
        payload: files,
      })
    );
};
export const fetchFile = (id) => async (dispatch) => {
  console.log("fetching single file");
  await fetch(`${fileUrl}/files/${id}`)
    .then((res) => res.json())
    .then((file) =>
      dispatch({
        type: FETCH_FILE,
        payload: file,
      })
    );
};

export const createFile = (fileData) => (dispatch) => {
  axios
    .post(`${fileUrl}/files`, fileData)
    //   .then((response) => response.json())
    .then((file) =>
      dispatch({
        type: NEW_FILE,
        payload: file,
      })
    )
    .catch((error) => {
      console.log(error);
    });
};

export const deleteFile = (id) => (dispatch) => {
  axios
    .delete(`${fileUrl}/files/${id}`)
    //   .then((response) => response.json())
    .then((file) =>
      dispatch({
        type: DELETE_FILE,
        payload: file,
      })
    )
    .catch((error) => {
      console.log(error);
    });
};
