import React, { useContext, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { AuthContext } from '../services/AuthProvider';
import { AuthContextState, GetTodoQuery } from '../types';
import TodoItem from './TodoItem';
import { getTodos } from '../api/todos/requests';

const TodoList:React.FC = () => {

    const { isAuthenticated } = useContext<AuthContextState>(AuthContext);

    const [hideCompleted, setHideCompleted] = useState<boolean>(false);
    const [orderBy, setOrderBy] = useState<string>('Date');
    const [query, setQuery] = useState<GetTodoQuery>({ filter: 'ALL', orderBy: 'CREATED_AT' });

    const queryClient = useQueryClient();

    //@ts-ignore
    const { data, status, error, isSuccess } = useQuery(['todos', query], getTodos, {
        enabled: !!isAuthenticated
    });

    useEffect(() => {
        queryClient.invalidateQueries('todos');
    }, [query]);

    // Toggle hide completed
    const handleChange:React.ChangeEventHandler<HTMLInputElement> = () => {
        setHideCompleted(!hideCompleted);
        const q = {...query};
        q.filter = !hideCompleted ? 'INCOMPLETE' : 'ALL';
        setQuery(q);
    }

    const handleFilterChange:React.MouseEventHandler<HTMLHeadingElement> = () => {
        // Cycle filter options (date -> A-Z -> Z-A)
        if (orderBy === 'Date') {
            const q = {...query};
            q.orderBy = 'DESCRIPTION';
            setQuery(q);
            setOrderBy('A-Z');
        }
        else if (orderBy === 'A-Z') {
            const q = {...query};
            q.orderBy = 'DESCRIPTION-REVERSE';
            setQuery(q);
            setOrderBy('Z-A');
        }
        else if (orderBy === 'Z-A') {
            const q = {...query};
            q.orderBy = 'CREATED_AT';
            setQuery(q);
            setOrderBy('Date');
        }
    }

    return (
        <div className="bg-gray-100 p-4">
            <h3 className="border-b-2 border-gray-600 pb-2 cursor-pointer select-none" onClick={handleFilterChange}><b>Tasks</b> - Ordering by <u>{ orderBy }</u></h3>
            <div className="divide-y-2 divide-gray-400 divide-solid">
                {/*@ts-ignore*/}
                { isAuthenticated && isSuccess && data.map(todo => (
                    <TodoItem key={todo.id} id={todo.id} state={todo.state} description={todo.description}/>
                ))}
            </div>
            {/*@ts-ignore*/}
            { isSuccess && data.length === 0 && isAuthenticated && 
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