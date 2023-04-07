import {
  CHAT_DETAILS_REQUEST,
  CHAT_DETAILS_SUCCESS,
  CHAT_DETAILS_FAIL,
  CHAT_CREATE_REQUEST,
  CHAT_CREATE_SUCCESS,
  CHAT_CREATE_FAIL,
  CHAT_JOIN_REQUEST,
  CHAT_JOIN_SUCCESS,
  CHAT_JOIN_FAIL,
} from "../constants/chatConstants";

// Compare this snippet from frontend/src/actions/chatActions.js:
export const chatDetailsReducer = (state = { chat: {} }, action) => {
  switch (action.type) {
    case CHAT_DETAILS_REQUEST:
      return { loading: true };
    case CHAT_DETAILS_SUCCESS:
      return { loading: false, chat: action.payload };
    case CHAT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const chatCreateReducer = (state = { chat: {} }, action) => {
  switch (action.type) {
    case CHAT_CREATE_REQUEST:
      return { loading: true };
    case CHAT_CREATE_SUCCESS:
      return { loading: false, success: true, chat: action.payload };
    case CHAT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const joinRoomReducer = (state = { room: {} }, action) => {
  switch (action.type) {
    case CHAT_JOIN_REQUEST:
      return { loading: true };
    case CHAT_JOIN_SUCCESS:
      return { loading: false, success: true, room: action.payload };
    case CHAT_JOIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const noteCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTE_CREATE_REQUEST:
      return { loading: true };
    case NOTE_CREATE_SUCCESS:
      return { loading: false, success: true, note: action.payload };
    case NOTE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case NOTE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const noteDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTE_DELETE_REQUEST:
      return { loading: true };
    case NOTE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case NOTE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
