import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const { isAuthenticated, logout } = useAuth();

    if (!isAuthenticated) {
        logout(); 
        
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;