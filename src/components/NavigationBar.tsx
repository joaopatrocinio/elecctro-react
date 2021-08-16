import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthProvider, { AuthContext } from '../AuthProvider';
import { AuthContextState } from '../types';

const NavigationBar:React.FC = () => {

    const { isAuthenticated, getUser } = useContext<AuthContextState>(AuthContext);

    return (
        <AuthProvider>
            <div className="container mx-auto my-4 font-mono">
                <div className="flex flex-row flex-nowrap items-center bg-gray-100 p-4 gap-4">
                    <Link to="/">Home</Link>
                    { !isAuthenticated && 
                        <>
                            <Link to="/login">Login</Link>
                        </>
                    }
                    { isAuthenticated &&
                        <>
                            <span>{ getUser.name }</span>
                            <Link to="/logout">Logout</Link>
                        </>
                    }
                </div>
            </div>
        </AuthProvider>
    );
}

export default NavigationBar;