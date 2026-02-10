import { createContext, useContext, useState, useEffect } from 'react';
import { bookingService } from '../services/bookingService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = bookingService.getCurrentUser();
        if (storedUser) {
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        setUser(userData);
        bookingService.setCurrentUser(userData);
    };

    const logout = () => {
        setUser(null);
        bookingService.clearCurrentUser();
    };

    const register = (userData) => {
        bookingService.saveUser(userData);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
