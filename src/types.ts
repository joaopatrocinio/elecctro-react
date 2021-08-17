export type Todo = {
    id?: number,
    state?: string,
    description: string
}

export type GetTodoQuery = {
    filter: string,
    orderBy: string
}

export type TodosContextState = {
    todos: Array<Todo>,
    query: GetTodoQuery,
    setQuery: (query: GetTodoQuery) => void,
    addTodo: (todo: Todo) => void,
    removeTodo: (id: number) => void,
    updateTodo: (todo: Todo) => void,
    refreshTodos: (query: GetTodoQuery) => void
}

export type User = {
    email: string,
    password?: string,
    name?: string
}

export type AuthContextState = {
    isAuthenticated: boolean,
    user: User,
    refreshUser: () => void,
    login: (user:User) => void,
    logout: () => void
}