import { createContext, useContext, useState } from 'react';

// Hardcoded admin credentials (frontend-only guard)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'tuitionwala@admin'
};

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('tw_admin_auth') === 'true';
    });
    const [error, setError] = useState('');

    const login = (username, password) => {
        if (
            username === ADMIN_CREDENTIALS.username &&
            password === ADMIN_CREDENTIALS.password
        ) {
            localStorage.setItem('tw_admin_auth', 'true');
            setIsAuthenticated(true);
            setError('');
            return true;
        } else {
            setError('Invalid username or password. Please try again.');
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('tw_admin_auth');
        setIsAuthenticated(false);
    };

    return (
        <AdminAuthContext.Provider value={{ isAuthenticated, login, logout, error }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAdminAuth = () => {
    const ctx = useContext(AdminAuthContext);
    if (!ctx) throw new Error('useAdminAuth must be used inside AdminAuthProvider');
    return ctx;
};
