
import React, { useEffect, useState } from 'react';
import axiosClient from '../config/axiosConfig';
import { useAuth } from '../context/AuthContext';


const CancionesPage = () => {
    const [canciones, setCanciones] = useState(null);
    const [error, setError] = useState('');
    const { logout } = useAuth(); 

    useEffect(() => {
        const fetchCanciones = async () => {
            try {
                const response = await axiosClient.get('/canciones'); 
                setCanciones(response.data.mensaje); 
            } catch (err) {
                console.error('Error al obtener canciones:', err);
                setError('No se pudieron cargar las canciones. Tu sesión pudo haber expirado.');
            }
        };

        fetchCanciones();
    }, []);


    const pageStyle = {
        minHeight: '100vh',
        backgroundColor: '#121212', 
        color: '#ffffff',
        padding: '40px',
        fontFamily: 'Arial, sans-serif'
    };

    const headerStyle = {
        borderBottom: '2px solid #1db954',
        paddingBottom: '15px',
        marginBottom: '30px'
    };

    const contentBoxStyle = {
        backgroundColor: '#1e1e1e', 
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
        marginTop: '20px'
    };

    const buttonStyle = {
        backgroundColor: '#535353', 
        color: 'white',
        padding: '10px 20px',
        borderRadius: '500px',
        border: 'none',
        marginTop: '30px',
        cursor: 'pointer',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        transition: 'background-color 0.2s'
    };
    
    const logoutButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#ff4d4d',
        marginRight: '15px',
        ':hover': { backgroundColor: '#cc0000' }
    };


    return (
        <div style={pageStyle}>
            <h1 style={headerStyle}>🎧 Mi Lista de Reproducción</h1>
            
            {error && <p style={{ color: '#ff4d4d', fontWeight: 'bold' }}>⚠️ {error}</p>}
            
            {canciones ? (
                <div style={contentBoxStyle}>
                    <p style={{ fontWeight: 'bold', fontSize: '1.2em', color: '#1db954' }}>
                        ¡Ruta Protegida Exitosa!
                    </p>
                    <p style={{ fontSize: '1.1em', marginTop: '10px' }}>
                        Mensaje del Backend: **{canciones}**
                    </p>
                </div>
            ) : (
                <p>Cargando contenido...</p>
            )}
            
            <button 
                onClick={logout} 
                style={logoutButtonStyle}
            >
                Cerrar Sesión
            </button>
        </div>
    );
};

export default CancionesPage;