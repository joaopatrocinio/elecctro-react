import React, { useContext, useState } from 'react';
import { TodoContext } from '../TodoContext';
import { Todo, TodosContextState } from '../types';

const TodoItem:React.FC<Todo> = ({ id, state, description }) => {

    const [isChecked, setIsChecked] = useState<boolean>(state === 'COMPLETE');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [newDescription, setNewDescription] = useState<string>(description);

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
        if (!isEditing) {
            setIsEditing(true);
        }
        else {
            updateTodo({
                id,
                state,
                description: newDescription
            });
            setIsEditing(false);
        }
    }

    const handleUpdateChange:React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setNewDescription(e.target.value);
    }

    return (
        <div className="flex flex-row flex-nowrap justify-between items-center bg-gray-100 p-4 gap-4">
            <input 
                type="checkbox"
                className="flex-none cursor-pointer"
                checked={isChecked}
                onChange={handleOnChange} />
            { isEditing &&
                <input className="flex-grow p-2 rounded-xl" type="text" value={newDescription} onChange={handleUpdateChange}></input>
            }
            { !isEditing &&   
                <span className="flex-grow cursor-pointer" onClick={handleOnChange} >{ description }</span>
            }
            <div className="flex-none">
                <button onClick={handleUpdate}>{ !isEditing ? 'Edit' : 'Save' }</button>
                <span> / </span>
                <button onClick={handleRemove}>Delete</button>
            </div>
        </div>
    );
}

export default TodoItem;