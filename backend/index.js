// 1. Importaciones
const express = require('express');
const cors = require('cors'); 
const app = express();
const port = 4000; 


const allowedOrigins = ['http://localhost:5173']; 

app.use(cors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
    optionsSuccessStatus: 204
}));

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Servidor de Express funcionando!');
});

app.get('/canciones', (req, res) => {
       res.status(200).json({ 
        mensaje: '¡Conexión exitosa! Los datos de canciones vendrán aquí.',
        data: ['Canción 1', 'Canción 2', 'Canción 3'] 
    });
});



app.listen(port, () => {
  console.log(` Servidor Express escuchando en http://localhost:${port}`);
});