import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {
  marketItems: null
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && 
  window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;
