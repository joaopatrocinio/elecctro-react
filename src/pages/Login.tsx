import React from 'react';

const Login:React.FC = () => {

    return (
        <div className="container mx-auto my-4 font-mono rounded-md bg-white w-2/6 max-w-lg shadow-md border-t-2 border-gray-200">
            <form className="p-4 flex flex-col gap-4 pt-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="email-input" className="text-sm">Email:</label>
                    <input type="email" className="rounded h-8 shadow border-b-2 border-gray-500 px-2 text-sm" id="email-input" />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password-input" className="text-sm">Password:</label>
                    <input type="password" className="rounded h-8 shadow border-b-2 border-gray-500 px-2 text-sm" id="password-input" />
                </div>

                <input type="submit" value="Login" className="w-32 mx-auto h-8 mt-4 rounded bg-gray-100 cursor-pointer shadow-inner" />
            </form>
        </div>
    );
}

export default Login;