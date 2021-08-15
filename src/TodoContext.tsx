import { createContext } from "react";
import { TodosContextState } from "./types";

export const TodoContext = createContext<TodosContextState>({
    todos: [],
    getCounter: () => 0,
    addTodo: () => {},
    removeTodo: () => {},
    updateTodo: () => {}
});