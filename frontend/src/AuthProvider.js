import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [fullName, setFullName] = useState('');

    useEffect(() => {
        const data = localStorage.getItem('user');
        if (data) {
            const user = JSON.parse(data);
            setIsLoggedIn(true);
            setUserRole(user.role);
            setFullName(user.username);
        }
    }, []);

    const logout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        setUserRole('');
        setFullName('');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userRole, fullName, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
