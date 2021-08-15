import React, { useState } from 'react';
import CreateTodo from './components/CreateTodo';
import TodoList from './components/TodoList';
import { TodoContext } from './TodoContext';
import { Todo } from './types';

const App:React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [counter, setCounter] = useState<number>(1);

  const getCounter = () => {
    let old = counter;
    setCounter(counter + 1);
    return old;
  }

  const addTodo = (newTodo: Todo) => {
    setTodos((todos) => [...todos, newTodo]);
  }

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = (todo: Todo) => {
    const index = todos.findIndex(x=> x.id === todo.id);
    const newTodos = [...todos];
    newTodos[index] = todo;
    setTodos(newTodos);
  };

  return (
    <TodoContext.Provider value={
      {
        todos,
        getCounter,
        addTodo,
        removeTodo,
        updateTodo
      }
    }>
      <div className="App container mx-auto my-4 font-mono">
        <CreateTodo></CreateTodo>
        <TodoList></TodoList>
      </div>
    </TodoContext.Provider>
  );
}

export default App;
