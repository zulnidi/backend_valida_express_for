import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"]
  },
  apellido: {
    type: String,
    required: [true, "El apellido es obligatorio"]
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Formato de correo inválido"]
  },
  contraseña: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    minlength: [8, "La contraseña debe tener al menos 8 caracteres"]
  }
}, { timestamps: true });

export default mongoose.model("Usuario", usuarioSchema);
