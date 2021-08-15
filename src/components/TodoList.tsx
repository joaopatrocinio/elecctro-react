import React, { useContext, useEffect, useState } from 'react';
import { TodoContext } from '../TodoContext';
import { Todo, TodosContextState } from '../types';
import TodoItem from './TodoItem';

const TodoList:React.FC = () => {

    const { todos } = useContext<TodosContextState>(TodoContext);

    const [items, setItems] = useState<Todo[]>(todos);
    const [hideCompleted, setHideCompleted] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>('date');

    // Load todos into items state (NOT WORKING WHEN ITEM UPDATES)
    useEffect(() => {
        setItems(todos);
    }, [todos]);

    // Toggle hide completed
    const handleChange:React.ChangeEventHandler<HTMLInputElement> = () => {
        setHideCompleted(!hideCompleted);
        if (hideCompleted === false) {
            setItems(todos.filter(todo => todo.state === 'INCOMPLETE'));
        }
        else {
            setItems(todos);
        }
    }

    const handleFilterChange:React.MouseEventHandler<HTMLHeadingElement> = () => {
        // Cycle filter options (date -> A-Z -> Z-A)
        if (filter === 'date') setFilter('A-Z');
        else if (filter === 'A-Z') setFilter('Z-A');
        else if (filter === 'Z-A') setFilter('date');

        // Update items based on filter
        if (filter === 'date') setItems(items.sort((a, b) => a.id > b.id ? a.id : b.id));
        else if (filter === 'A-Z') setItems(items.sort((a, b) => a.description.localeCompare(b.description)));
        else if (filter === 'Z-A') setItems(items.sort((a, b) => a.description.localeCompare(b.description)).reverse());
    }

    return (
        <div className="bg-gray-100 p-4">
            <h3 className="border-b-2 border-gray-600 pb-2 cursor-pointer select-none" onClick={handleFilterChange}>Tasks - Filtering by ({ filter })</h3>
            <div className="divide-y-2 divide-gray-400 divide-solid">
                { items.map(todo => (
                    <TodoItem key={todo.id} id={todo.id} state={todo.state} description={todo.description}/>
                ))}
           </div>

           <div className="flex flex-row items-center gap-2 mt-4">
               <label htmlFor="checkHide" className="select-none">Hide Completed</label>
               <input type="checkbox" id="checkHide" checked={hideCompleted} onChange={handleChange} />
           </div>
        </div>
    )
}

export default TodoList;