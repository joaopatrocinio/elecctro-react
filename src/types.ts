export type Todo = {
    state: string,
    description: string
}

export type TodosContextState = {
    todos: Array<Todo>,
    addTodo: (todo: Todo) => void
}