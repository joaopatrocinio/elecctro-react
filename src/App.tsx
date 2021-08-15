import React from 'react';
import CreateTodo from './components/CreateTodo';
import TodoList from './components/TodoList';
import TodoProvider from './TodoProvider';

const App:React.FC = () => {

  return (
    <TodoProvider>
      <div className="App container mx-auto my-4 font-mono">
        <CreateTodo></CreateTodo>
        <TodoList></TodoList>
      </div>
    </TodoProvider>
  );
}

export default App;
