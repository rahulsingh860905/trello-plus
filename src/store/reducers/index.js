import { combineReducers } from "redux";
import listReducer from "./list";

const rootReducer = combineReducers({
  lists: listReducer
});

export default rootReducer;
