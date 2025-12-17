
const allowedOrigins = ['http://localhost:4000']; 

app.use(cors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // VITAL: Permite enviar cookies y encabezados de autorización
    // Si tu frontend envía el token en un encabezado 'token_usuario' (como sugiere tu middleware), 
    // asegúrate de que esté permitido si usaras otros encabezados, aunque 'credentials: true' a veces es suficiente.
    exposedHeaders: ['token_usuario'], 
}));

// ...