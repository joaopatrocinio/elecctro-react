import React, { useState } from 'react';
import { Todo } from '../types';

const TodoItem:React.FC<Todo> = ({ state, description }) => {

    const [isChecked, setIsChecked] = useState<boolean>(state === 'COMPLETE');

    const handleOnChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className="flex flex-row flex-nowrap justify-between items-center bg-gray-100 p-4 gap-4">
            <input 
                type="checkbox"
                className="flex-none cursor-pointer"
                checked={isChecked}
                onChange={handleOnChange} />
            <span className="flex-grow cursor-pointer" onClick={handleOnChange}>{ description } </span>
            <div className="flex-none">
                <span>Edit</span>
                <span> / </span>
                <span>Delete</span>
            </div>
        </div>
    );
}

export default TodoItem;