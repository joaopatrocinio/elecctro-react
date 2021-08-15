import React, { useContext, useState } from 'react';
import { TodoContext } from '../TodoContext';
import { Todo, TodosContextState } from '../types';

const TodoItem:React.FC<Todo> = ({ id, state, description }) => {

    const [isChecked, setIsChecked] = useState<boolean>(state === 'COMPLETE');
    const { removeTodo, updateTodo } = useContext<TodosContextState>(TodoContext);

    const handleOnChange = () => {
        setIsChecked(!isChecked);
        updateTodo({
            id,
            state: !isChecked ? 'COMPLETE' : 'INCOMPLETE',
            description
        });
    };

    const handleRemove:React.MouseEventHandler<HTMLButtonElement> = () => {
        removeTodo(id);
    }

    const handleUpdate:React.MouseEventHandler<HTMLButtonElement> = () => {
        updateTodo({
            id,
            state: 'COMPLETE',
            description: 'Update title'
        });
    }

    return (
        <div className="flex flex-row flex-nowrap justify-between items-center bg-gray-100 p-4 gap-4">
            <input 
                type="checkbox"
                className="flex-none cursor-pointer"
                checked={isChecked}
                onChange={handleOnChange} />
            <span className="flex-grow cursor-pointer" onClick={handleOnChange} >{ description }</span>
            <div className="flex-none">
                <button onClick={handleUpdate}>Edit</button>
                <span> / </span>
                <button onClick={handleRemove}>Delete</button>
            </div>
        </div>
    );
}

export default TodoItem;