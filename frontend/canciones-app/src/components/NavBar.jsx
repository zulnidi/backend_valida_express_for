import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navStyle = {
        background: '#0d0d0d',
        color: 'white',
        padding: '15px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
    };
    const linkStyle = {
        color: 'white',
        textDecoration: 'none',
        margin: '0 15px',
        fontSize: '1.1em',
        transition: 'color 0.3s',
    };
    const activeLinkStyle = {
        color: '#1db954', 
        fontWeight: 'bold',
    };
    const buttonStyle = {
        padding: '8px 15px',
        backgroundColor: '#1db954',
        color: 'white',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.3s',
    };

    return (
        <nav style={navStyle}>
            <Link to="/" style={{ ...linkStyle, ...activeLinkStyle, fontSize: '1.5em' }}>
                 CanTastic
            </Link>

            <div style={{ display: 'flex', alignItems: 'center' }}>
                {isAuthenticated ? (
                    <>
                        <Link to="/" style={linkStyle}>Canciones</Link>
                        <Link to="/albums" style={linkStyle}>Álbumes</Link>
                        
                        <button 
                            onClick={handleLogout} 
                            style={buttonStyle}
                        >
                            Cerrar Sesión
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={linkStyle}>Iniciar Sesión</Link>
                        <Link to="/registro" style={{...linkStyle, ...buttonStyle, marginLeft: '15px', backgroundColor: '#333'}}>
                            Regístrate
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default NavBar;