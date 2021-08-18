import React, { createContext, useState, FC, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { AuthContextState, GetTodoQuery, Todo, TodosContextState } from "../types";

const contextDefaultValues: TodosContextState = {
    todos: [],
    query: { filter: 'ALL', orderBy: 'CREATED_AT' },
    setQuery: () => {},
    addTodo: () => {},
    removeTodo: () => {},
    updateTodo: () => {},
    refreshTodos: () => {}
};

export const TodoContext = createContext<TodosContextState>(
    contextDefaultValues
);

const TodoProvider: FC = ({ children }) => {
    const [todos, setTodos] = useState<Todo[]>(contextDefaultValues.todos);
    const [query, setQuery] = useState<GetTodoQuery>(contextDefaultValues.query);

    const { token } = useContext<AuthContextState>(AuthContext);

    const addTodo = async (newTodo: Todo) => {
        await fetch("http://localhost:3001/todos", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            method: 'POST',
            body: JSON.stringify(newTodo)
        });
        refreshTodos(query);
    }
    
    const removeTodo = async (id: number) => {
        await fetch("http://localhost:3001/todo/" + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        refreshTodos(query);
    };

    const updateTodo = async (todo: Todo) => {
        const id = todo.id;
        delete todo.id;
        await fetch("http://localhost:3001/todo/" + id, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(todo)
        })
        refreshTodos(query);
    };

    const refreshTodos = async (query:GetTodoQuery) => {
        const response = await fetch("http://localhost:3001/todos?" + new URLSearchParams(query), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        const todos = await response.json();
        if (response.status === 200) {
            setTodos(todos);
        }
        else {
            setTodos([]);
        }
    }

    return (
        <TodoContext.Provider
            value={{
                todos,
                query,
                setQuery,
                addTodo,
                removeTodo,
                updateTodo,
                refreshTodos
            }}
        >
        {children}
        </TodoContext.Provider>
    );
};

export default TodoProvider;