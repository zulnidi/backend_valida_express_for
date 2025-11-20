import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { conectarDB } from "./config/db.js";

import usuarioRoutes from "./routes/usuarioRoutes.js";
import cancionesRoutes from "./routes/cancionesRoutes.js";
import albumRoutes from "./routes/albumRoutes.js";

dotenv.config();
conectarDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// ruta pública
app.use("/usuarios", usuarioRoutes);

// ruta protegida
app.use("/canciones", cancionesRoutes);
app.use("/albums", albumRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
