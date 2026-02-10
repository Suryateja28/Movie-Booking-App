import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Film, LogOut, User } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-[#1e293b]/50 backdrop-blur-md sticky top-0 z-50 border-b border-slate-700">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2 group">
                    <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-500 transition-colors">
                        <Film className="text-white w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        MoviePass
                    </span>
                </Link>

                {user ? (
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2 text-slate-300">
                            <User className="w-5 h-5" />
                            <span className="font-medium">{user.name}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 bg-slate-800 hover:bg-red-900/40 text-slate-300 hover:text-red-400 px-4 py-2 rounded-lg transition-all border border-slate-700 hover:border-red-900/50"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </button>
                    </div>
                ) : (
                    <div className="space-x-4">
                        <Link to="/login" className="text-slate-300 hover:text-white transition-colors">Login</Link>
                        <Link
                            to="/register"
                            className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg transition-all font-medium shadow-lg shadow-indigo-500/20"
                        >
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
