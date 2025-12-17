import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Registro from './components/Registro';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';
import CancionesPage from './pages/CancionesPage'; 
import NavBar from './components/NavBar'; 
import "./App.css"

const AppLayout = () => {
    return (
        <>
            <NavBar />
            <div style={{ padding: '20px' }}>
                <Routes>
                    <Route path="/registro" element={<Registro />} />
                    <Route path="/login" element={<Login />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<CancionesPage />} />
                        <Route path="/albums" element={<div>Página de Álbumes Protegida</div>} />
                    </Route>
                    
                    <Route path="*" element={<div>404: Ruta No Encontrada</div>} />
                </Routes>
            </div>
        </>
    );
};
const App = () => (
    <Router>
        <AuthProvider>
            <AppLayout />
        </AuthProvider>
    </Router>
);

export default App;