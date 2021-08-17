import React, { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import { AuthContextState } from '../types';

const NavigationBar:React.FC = () => {

    const { isAuthenticated, user, logout } = useContext<AuthContextState>(AuthContext);

    const handleLogout:React.MouseEventHandler<HTMLAnchorElement> = (e) => {

        e.preventDefault();
        logout();
        return <Redirect to="/"></Redirect>
    }

    return (
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
                        <span>{ user.name }</span>
                        <Link to="/logout" onClick={handleLogout}>Logout</Link>
                    </>
                }
            </div>
        </div>
    );
}

export default NavigationBar;