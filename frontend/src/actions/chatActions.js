import axios from "axios";
import {
  CHAT_DETAILS_REQUEST,
  CHAT_DETAILS_SUCCESS,
  CHAT_DETAILS_FAIL,
  CHAT_UPDATE_REQUEST,
  CHAT_UPDATE_SUCCESS,
  CHAT_UPDATE_FAIL,
  CHAT_CREATE_REQUEST,
  CHAT_CREATE_SUCCESS,
  CHAT_CREATE_FAIL,
  CHAT_JOIN_REQUEST,
  CHAT_JOIN_SUCCESS,
  CHAT_JOIN_FAIL,
} from "../constants/chatConstants";

export const getChatDetail = (id) => async (dispatch) => {
  try {
    console.log("Get Chat Action");
    dispatch({ type: CHAT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/chat/${id}`);
    console.log("Chat Details: ", data);
    dispatch({
      type: CHAT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHAT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addNote = (note) => async (dispatch) => {
  try {
    console.log("addNote action");
    dispatch({ type: NOTE_CREATE_REQUEST });

    const { data } = await axios.post(`/api/note`, note);
    console.log("addNote action data: ", data);
    dispatch({
      type: NOTE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NOTE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteNote = (noteId) => async (dispatch) => {
  try {
    dispatch({ type: NOTE_DELETE_REQUEST });
    console.log("deleteNote action");
    const { data } = await axios.delete(`/api/note/${noteId}`);
    console.log("deleteNote action data: ", data);
    dispatch({
      type: NOTE_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NOTE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateChat = (chat) => async (dispatch) => {
  try {
    console.log("updateChat action");
    dispatch({ type: CHAT_UPDATE_REQUEST });
    console.log(chat);
    const { data } = await axios.put(`/api/chat/${chat.name}`, chat);
    console.log("updateChat action data: ", data);
    dispatch({
      type: CHAT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHAT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createRoom = (room) => async (dispatch) => {
  try {
    console.log("createRoom action");
    dispatch({ type: CHAT_CREATE_REQUEST });
    console.log(room);
    const { data } = await axios.post(`/api/chat/create`, room);
    console.log("createRoom action data: ", data);
    dispatch({
      type: CHAT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHAT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const joinRoom = (room) => async (dispatch) => {
  try {
    console.log("joinRoom action");
    dispatch({ type: CHAT_JOIN_REQUEST });
    console.log(room);
    const { data } = await axios.post(`/api/chat/join/${room.id}`, room);
    console.log("joinRoom action data: ", data);
    dispatch({
      type: CHAT_JOIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHAT_JOIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
