import React from 'react';
import CreateTodo from '../components/CreateTodo';
import TodoList from '../components/TodoList';

const Todos:React.FC = () => {

    return (
        <div className="container mx-auto my-4 font-mono">
            <CreateTodo></CreateTodo>
            <TodoList></TodoList>
        </div>
    );
  }
  
  export default Todos;
  