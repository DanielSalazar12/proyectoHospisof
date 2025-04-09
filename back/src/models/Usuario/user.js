
import { Schema, model, Types } from "mongoose";
const usuarioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    apellido: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    telefono: {
      type: String,
      required: true,
    },
    especialidad: {
      type: String,
    },
    rol: {
      type: Types.ObjectId, // Esto es para la foranea de roles
      ref: "Roles",
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    passwordUser: {
      type: String,
      required: true,
    },
  },
  { collection: "users" }
);
export default model("Usuario", usuarioSchema);
