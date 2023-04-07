import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  chatDetailsReducer,
  chatCreateReducer,
  joinRoomReducer,
} from "./reducers/chatReducers";

const reducer = combineReducers({
  chatDetails: chatDetailsReducer,
  chatCreate: chatCreateReducer,
  joinRoom: joinRoomReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
