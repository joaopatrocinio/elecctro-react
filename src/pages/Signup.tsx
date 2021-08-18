import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../services/AuthProvider';
import { AuthContextState } from '../types';

const Signup:React.FC = () => {

    const { signup, isAuthenticated } = useContext<AuthContextState>(AuthContext);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const history = useHistory();
    
    useEffect(() => {
        if (isAuthenticated) {
            history.push('/');
        }
    }, [isAuthenticated]);

    const handleSubmit:React.FormEventHandler<HTMLFormElement> = async (e) => {

        e.preventDefault();
        signup({ email, password, name });
    };

    const handleEmailChange:React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange:React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setPassword(e.target.value);
    };

    const handleNameChange:React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setName(e.target.value);
    };

    return (
        <div className="container mx-auto my-4 font-mono rounded-md bg-blue-100 w-2/6 max-w-lg shadow-md">
            <form className="p-4 flex flex-col gap-4 pt-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                    <label htmlFor="name-input" className="text-sm">Name:</label>
                    <input type="name" className="rounded h-8 shadow border-b-2 border-blue-500 px-2 text-sm" id="password-input" onChange={handleNameChange}/>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email-input" className="text-sm">Email:</label>
                    <input type="email" className="rounded h-8 shadow border-b-2 border-blue-500 px-2 text-sm" id="email-input" onChange={handleEmailChange} />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password-input" className="text-sm">Password:</label>
                    <input type="password" className="rounded h-8 shadow border-b-2 border-blue-500 px-2 text-sm" id="password-input" onChange={handlePasswordChange}/>
                </div>
                <input type="submit" value="Signup" className="w-32 mx-auto h-8 mt-4 rounded bg-blue-400 text-white cursor-pointer shadow" />
            </form>
        </div>
    );
}

export default Signup;