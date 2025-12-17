import axios from 'axios';

const API_URL = 'http://localhost:4000'; 

const axiosClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token_usuario');
        if (token) {
            config.headers['token_usuario'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => response, 
    (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
        
            console.error('Token inválido o expirado. Redireccionando a Login...');
        }
        return Promise.reject(error);
    }
);

export default axiosClient;