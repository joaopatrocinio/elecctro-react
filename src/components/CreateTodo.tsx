import logo from '../logo.svg';
import React, { useContext, useState } from 'react';
import { TodoContext } from '../TodoContext';

const CreateTodo:React.FC = () => {

    const [newTodo, setNewTodo] = useState<string>('');
    const { addTodo } = useContext(TodoContext);

    const handleChange:React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setNewTodo(e.target.value);
    }

    return (
        <div className="flex flex-row flex-nowrap items-center bg-gray-100 p-4 gap-4">
            <div className="flex-none">
                <img src={logo} alt="Logo" className="w-24" />
            </div>
            <div className="flex-grow">
                <input type="text" className="w-full px-4 py-2 rounded-xl" placeholder="Write new task here… " value={newTodo} onChange={handleChange}/>
            </div>
            <div className="flex-none">
                <button className="rounded-xl px-4 py-2 bg-gray-200" onClick={() => {
                    addTodo({
                        state: 'INCOMPLETE',
                        description: newTodo
                    });
                }}>Create</button>
            </div>
        </div>
    );
}

export default CreateTodo;