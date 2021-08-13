import { createContext } from "react";
import { TodosContextState } from "./types";

export const TodoContext = createContext<TodosContextState>({
    todos: [],
    addTodo: () => {}
});