import { createContext, useState, FC, useEffect } from "react";
import { User, AuthContextState } from "../types";

const contextDefaultValues: AuthContextState = {
    isAuthenticated: false,
    user: {
        email: '',
        name: ''
    },
    token: '',
    refreshUser: () => {},
    login: (user:User) => {},
    logout: () => {},
    signup: (user:User) => {}
};

export const AuthContext = createContext<AuthContextState>(
    contextDefaultValues
);

const AuthProvider: FC = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(contextDefaultValues.isAuthenticated);
    const [user, setUser] = useState<User>(contextDefaultValues.user);

    const [token, setToken] = useState<string>(contextDefaultValues.token);

    // Load token from localStorage into state
    useEffect(() => {

        const tkn = localStorage.getItem('token');
        if (tkn !== null) {
            setToken(tkn);
            setIsAuthenticated(true);
        }
    }, []);

    // Load user from server into state after login, and store token in localStorage
    useEffect(() => {
        if (isAuthenticated) {
            localStorage.setItem('token', token);
            refreshUser();
        }
    }, [isAuthenticated, token]);

    const refreshUser = async () => {
        
        if (isAuthenticated) {
            const response = await fetch("http://localhost:3001/me", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });

            const { email, name } = await response.json();
            setUser({ email, name });
        }
    }

    const login = async (user:User) => {

        const response = await fetch("http://localhost:3001/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        const { token } = await response.json();

        if (token !== undefined) {
            setToken(token);
            setIsAuthenticated(true);
        }
        else {
            alert('Incorrect credentials.');
        }
        
    }

    const logout = () => {

        setToken('');
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    }

    const signup = async (user:User) => {

        const response = await fetch("http://localhost:3001/users", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        const { token } = await response.json();

        if (response.status === 200) {
            if (token !== undefined) {
                setToken(token);
                setIsAuthenticated(true);
            }
        }
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                token,
                refreshUser,
                login,
                logout,
                signup
            }}
        >
        {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;