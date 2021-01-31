import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/rootReducer";

const store = createStore(
  rootReducer,
  {},
  compose(applyMiddleware(thunk), composeWithDevTools())
);

export default store;
