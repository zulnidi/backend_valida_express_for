import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../config/axiosConfig';
import { useAuth } from '../context/AuthContext';


const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        correo: '',
        contraseña: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axiosClient.post('/usuarios/login', formData);
            
            const { token } = response.data;
            login(token);

            navigate('/'); 

        } catch (err) {
            const errorMessage = err.response?.data?.mensaje || 'Error al conectar con el servidor.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };
    
    const formStyle = {
        background: 'linear-gradient(135deg, #1e1e1e 0%, #0a0a0a 100%)',
        color: '#fff',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
        maxWidth: '400px',
        margin: '50px auto',
        fontFamily: 'Arial, sans-serif'
    };
    const inputBaseStyle = {
        width: '100%',
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #333',
        background: '#252525',
        color: '#fff'
    };
    const buttonStyle = {
        width: '100%',
        padding: '12px',
        backgroundColor: '#1db954', 
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        marginTop: '20px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.3s'
    };

    return (
        <div style={formStyle}>
            <h2> Iniciar Sesión en Música</h2>
            <form onSubmit={handleSubmit}>
                {['correo', 'contraseña'].map((field) => (
                    <div key={field} style={{ marginBottom: '15px' }}>
                        <label 
                            htmlFor={field} 
                            style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}
                        >
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                        <input
                            type={field === 'contraseña' ? 'password' : 'text'}
                            id={field}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            required
                            style={inputBaseStyle}
                        />
                    </div>
                ))}
                
                {error && <p style={{ color: '#ff4d4d', marginTop: '10px', fontWeight: 'bold' }}>{error}</p>}

                <button 
                    type="submit" 
                    disabled={loading}
                    style={buttonStyle}
                >
                    {loading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
                </button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9em' }}>
                ¿No tienes una cuenta? <Link to="/registro" style={{ color: '#1db954', textDecoration: 'none' }}>Regístrate</Link>
            </p>
        </div>
    );
};

export default Login;