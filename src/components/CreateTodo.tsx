import logo from '../logo.svg';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { addTodo } from '../api/todos/requests';

const CreateTodo:React.FC = () => {

    const [newTodo, setNewTodo] = useState<string>('');

    const queryClient = useQueryClient();

    const addTodoMutation = useMutation(addTodo, {
        onSuccess: () => {
          queryClient.invalidateQueries('todos')
        },
    })

    const handleChange:React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setNewTodo(e.target.value);
    }

    const handleAddTodo:React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()

        if (newTodo !== '') {
            addTodoMutation.mutate({
                description: newTodo
            })
            setNewTodo('');
        }

    }

    return (
        <form className="flex flex-row flex-nowrap items-center bg-gray-100 p-4 gap-4" onSubmit={handleAddTodo}>
            <div className="flex-none">
                <img src={logo} alt="Logo" className="w-24" />
            </div>
            <div className="flex-grow">
                <input type="text" className="w-full px-4 py-2 rounded-xl" placeholder="Write new task here… " value={newTodo} onChange={handleChange}/>
            </div>
            <div className="flex-none">
                <button className="rounded-xl px-4 py-2 bg-gray-200" type="submit">Create</button>
            </div>
        </form>
    );
}

export default CreateTodo;
