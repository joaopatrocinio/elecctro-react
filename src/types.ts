export type Todo = {
    id?: number,
    state?: string,
    description: string
}

export type TodosContextState = {
    todos: Array<Todo>,
    addTodo: (todo: Todo) => void,
    removeTodo: (id: number) => void,
    updateTodo: (todo: Todo) => void,
    refreshTodos: () => void
}