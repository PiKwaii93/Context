import { createStore } from "redux";
import { ReduxTodoReducer } from "./ReduxTodoReducer";
import { ReduxTodos } from "./ReduxTodos";

export const ReduxStore = createStore(ReduxTodoReducer, ReduxTodos)

