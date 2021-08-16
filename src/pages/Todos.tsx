import React from 'react';
import CreateTodo from '../components/CreateTodo';
import TodoList from '../components/TodoList';
import TodoProvider from '../TodoProvider';

const Todos:React.FC = () => {

    return (
        <TodoProvider>
            <div className="container mx-auto my-4 font-mono">
                <CreateTodo></CreateTodo>
                <TodoList></TodoList>
            </div>
        </TodoProvider>
    );
  }
  
  export default Todos;
  