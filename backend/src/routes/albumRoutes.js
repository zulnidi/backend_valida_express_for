import express from "express";
import { autenticarUsuario } from "../middlewares/authMiddleware.js";

const router = express.Router();

// tods las rutas de álbumes requieren autenticación
router.use(autenticarUsuario);

//ruta de ejemplo
router.get("/", (req, res) => {
  res.json({ mensaje: "Aquí iría la lista de álbumes" });
});

export default router;
