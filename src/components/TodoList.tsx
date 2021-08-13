import React, { useContext } from 'react';
import { TodoContext } from '../TodoContext';
import TodoItem from './TodoItem';

const TodoList:React.FC = () => {

    const { todos } = useContext(TodoContext);

    return (
        <div className="bg-gray-100 p-4">
            <h3 className="border-b-2 border-gray-600 pb-2">Tasks</h3>
            <div className="divide-y-2 divide-gray-400 divide-solid">
                { todos.map(todo => (
                    <TodoItem state={todo.state} description={todo.description}/>
                )) }
           </div>
        </div>
    )
}

export default TodoList;