import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../services/AuthProvider';
import { TodoContext } from '../services/TodoProvider';
import { AuthContextState, TodosContextState } from '../types';
import TodoItem from './TodoItem';

const TodoList:React.FC = () => {

    const { todos, refreshTodos, query, setQuery } = useContext<TodosContextState>(TodoContext);
    const { isAuthenticated } = useContext<AuthContextState>(AuthContext);

    const [hideCompleted, setHideCompleted] = useState<boolean>(false);
    const [orderBy, setOrderBy] = useState<string>('Date');

    // Load To-do's into state at startup and also after Auth action
    useEffect(() => {
        refreshTodos(query);
    }, [isAuthenticated]);

    // Toggle hide completed
    const handleChange:React.ChangeEventHandler<HTMLInputElement> = () => {
        setHideCompleted(!hideCompleted);
        const q = {...query};
        q.filter = !hideCompleted ? 'INCOMPLETE' : 'ALL';
        setQuery(q);
        refreshTodos(q);
    }

    const handleFilterChange:React.MouseEventHandler<HTMLHeadingElement> = () => {
        // Cycle filter options (date -> A-Z -> Z-A)
        if (orderBy === 'Date') {
            const q = {...query};
            q.orderBy = 'DESCRIPTION';
            setQuery(q);
            setOrderBy('A-Z');
            refreshTodos(q);
        }
        else if (orderBy === 'A-Z') {
            const q = {...query};
            q.orderBy = 'DESCRIPTION-REVERSE';
            setQuery(q);
            setOrderBy('Z-A');
            refreshTodos(q);
        }
        else if (orderBy === 'Z-A') {
            const q = {...query};
            q.orderBy = 'CREATED_AT';
            setQuery(q);
            setOrderBy('Date');
            refreshTodos(q);
        }
    }

    return (
        <div className="bg-gray-100 p-4">
            <h3 className="border-b-2 border-gray-600 pb-2 cursor-pointer select-none" onClick={handleFilterChange}><b>Tasks</b> - Ordering by <u>{ orderBy }</u></h3>
            <div className="divide-y-2 divide-gray-400 divide-solid">
                { todos.map(todo => (
                    <TodoItem key={todo.id} id={todo.id} state={todo.state} description={todo.description}/>
                ))}
           </div>
            { todos.length === 0 && isAuthenticated && 
                <p className="text-center mt-2">Nothing to see here...</p>
            }

            { !isAuthenticated &&
                <p className="text-center mt-2">Login to see your to-do list...</p>
            }

           <div className="flex flex-row items-center gap-2 mt-4">
               <label htmlFor="checkHide" className="select-none">Hide Completed</label>
               <input type="checkbox" id="checkHide" checked={hideCompleted} onChange={handleChange} />
           </div>
        </div>
    )
}

export default TodoList;