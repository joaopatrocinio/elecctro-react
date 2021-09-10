import { Todo } from "../../types";

export const getTodos = async (req:any) => {
    const { queryKey } = req;
    const [_key, query] = queryKey;
    const response = await fetch("http://localhost:3001/todos?" + new URLSearchParams(query), {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json();
}

export const addTodo = async (newTodo: Todo) => {
    const response = await fetch("http://localhost:3001/todos", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        method: 'POST',
        body: JSON.stringify(newTodo)
    });
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json();
}

export const removeTodo = async (id: number) => {
    const response = await fetch("http://localhost:3001/todo/" + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json();
};

export const updateTodo = async (todo: Todo) => {
    const id = todo.id;
    delete todo.id;
    const response = await fetch("http://localhost:3001/todo/" + id, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(todo)
    })
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json();
};