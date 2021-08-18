import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../services/AuthProvider';
import { AuthContextState } from '../types';
import './NavigationBar.css';

const NavigationBar:React.FC = () => {

    const { isAuthenticated, user, logout } = useContext<AuthContextState>(AuthContext);
    const history = useHistory();

    const handleLogout:React.MouseEventHandler<HTMLAnchorElement> = (e) => {

        e.preventDefault();
        logout();
        history.push("/");
    }

    return (
        <div className="container mx-auto my-4 font-mono">
            <div className="flex flex-row flex-nowrap justify-between items-center bg-gray-100 p-4 gap-4">
                <div className="gap-4">
                    <Link to="/">Home</Link>
                </div>
                <div className="flex gap-4">
                    { !isAuthenticated && 
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </>
                    }
                    { isAuthenticated &&
                        <>
                            <span>Welcome, { user.name }!</span>
                            <Link to="/logout" onClick={handleLogout}>Logout</Link>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default NavigationBar;