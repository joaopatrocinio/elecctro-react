import { createContext, useState, FC } from "react";
import { User, AuthContextState } from "./types";

const contextDefaultValues: AuthContextState = {
    isAuthenticated: false,
    getUser: () => {},
    login: (user:User) => {},
    logout: () => {}
};

export const AuthContext = createContext<AuthContextState>(
    contextDefaultValues
);

const AuthProvider: FC = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(contextDefaultValues.isAuthenticated);
    const [user, setUser] = useState<User>();

    const getUser = () => {
        return user;
    }

    const login = (user:User) => {
        setIsAuthenticated(true);
        setUser({
            email: 'DEFAULT',
            name: 'DEFAULT'
        })
        return true;
    }

    const logout = () => {
        setIsAuthenticated(false);
        return true;
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                getUser,
                login,
                logout
            }}
        >
        {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;