import axios from "axios";
import {
  FETCH_EVENTS,
  FETCH_EVENT,
  NEW_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
} from "./types";
import { eventUrl } from "../../config/config";

export const fetchEvents = () => (dispatch) => {
  console.log("fetching");
  fetch(`${eventUrl}/events`)
    .then((res) => res.json())
    .then((events) =>
      dispatch({
        type: FETCH_EVENTS,
        payload: events,
      })
    );
};
export const fetchEvent = (id) => async (dispatch) => {
  console.log("fetching single event");
  await fetch(`${eventUrl}/events/${id}`)
    .then((res) => res.json())
    .then((event) =>
      dispatch({
        type: FETCH_EVENT,
        payload: event,
      })
    );
};

export const createEvent = (eventData) => (dispatch) => {
  axios
    .post(`${eventUrl}/events`, eventData)
    //   .then((response) => response.json())
    .then((event) =>
      dispatch({
        type: NEW_EVENT,
        payload: event,
      })
    )
    .catch((error) => {
      console.log(error);
    });
};

export const updateEvent = (eventData, id) => (dispatch) => {
  axios
    .put(`${eventUrl}/events/${id}`, eventData)
    .then((event) =>
      dispatch({
        type: UPDATE_EVENT,
        payload: event,
      })
    )
    .catch((error) => {
      console.log(error);
    });
};

export const deleteEvent = (id) => (dispatch) => {
  axios
    .delete(`${eventUrl}/events/${id}`)
    //   .then((response) => response.json())
    .then((event) =>
      dispatch({
        type: DELETE_EVENT,
        payload: event,
      })
    )
    .catch((error) => {
      console.log(error);
    });
};
