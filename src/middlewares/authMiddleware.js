import jwt from "jsonwebtoken";

export const autenticarUsuario = (req, res, next) => {
  const token = req.header("token_usuario") || req.cookies?.token_usuario;

  if (!token) {
    return res.status(401).json({ mensaje: "Token no proporcionado" });
  }

  try {
    const decodificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decodificado;
    next();

  } catch (error) {
    return res.status(401).json({ mensaje: "Token inválido o expirado" });
  }
};
