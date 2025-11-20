import express from "express";
import { autenticarUsuario } from "../middlewares/authMiddleware.js";

const router = express.Router();

//  las rutas protegidas
router.use(autenticarUsuario);

router.get("/", (req, res) => {
  res.json({ mensaje: "Lista de canciones" });
});

export default router;
