import { createContext, useState, FC, useEffect } from "react";
import { User, AuthContextState } from "./types";

const contextDefaultValues: AuthContextState = {
    isAuthenticated: false,
    user: {
        email: '',
        name: ''
    },
    refreshUser: () => {},
    login: (user:User) => {},
    logout: () => {}
};

export const AuthContext = createContext<AuthContextState>(
    contextDefaultValues
);

const AuthProvider: FC = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(contextDefaultValues.isAuthenticated);
    const [user, setUser] = useState<User>(contextDefaultValues.user);

    const [token, setToken] = useState<string>('');

    useEffect(() => {

        const tkn = localStorage.getItem('token');
        if (tkn !== null) {
            setToken(tkn);
            setIsAuthenticated(true);
        }
    }, []);

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
        
    }

    const logout = () => {

        setToken('');
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                refreshUser,
                login,
                logout
            }}
        >
        {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;