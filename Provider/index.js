import { createStore } from "redux";
import { AppReducer } from "../Reducers";

export const Store = createStore(AppReducer);
