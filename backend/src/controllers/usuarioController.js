import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, apellido, correo, contraseña } = req.body;

    if (!nombre || !apellido || !correo || !contraseña) {
      return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
      return res.status(400).json({ mensaje: "El correo ya está registrado" });
    }

    const salt = await bcrypt.genSalt(10);
    const contraseñaEncriptada = await bcrypt.hash(contraseña, salt);

    const nuevoUsuario = await Usuario.create({
      nombre,
      apellido,
      correo,
      contraseña: contraseñaEncriptada
    });

    const token = jwt.sign(
      { id: nuevoUsuario._id, correo: nuevoUsuario.correo },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

    return res.json({
      mensaje: "Usuario registrado",
      token
    });

  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor", error: error.message });
  }
};


export const loginUsuario = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña) {
      return res.status(400).json({ mensaje: "Correo y contraseña son obligatorios" });
    }

    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ mensaje: "Usuario no encontrado" });
    }

    const coincidePass = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!coincidePass) {
      return res.status(400).json({ mensaje: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: usuario._id, correo: usuario.correo },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

    return res.json({
      mensaje: "Login exitoso",
      token
    });

  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor", error: error.message });
  }
};
