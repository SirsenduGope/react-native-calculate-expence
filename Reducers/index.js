import { combineReducers } from "redux";
import ExpencesReducer from "./ExpencesReducer";

export const AppReducer = combineReducers({
  expencesState: ExpencesReducer,
});
