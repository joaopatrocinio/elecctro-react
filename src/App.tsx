import React, { useState } from 'react';
import CreateTodo from './components/CreateTodo';
import TodoList from './components/TodoList';
import { TodoContext } from './TodoContext';
import { Todo } from './types';

const App:React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <TodoContext.Provider value={
      {
        todos,
        addTodo: (newTodo: Todo) => setTodos((todos) => [...todos, newTodo])
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
