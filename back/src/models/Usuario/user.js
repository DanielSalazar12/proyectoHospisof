// models/Usuario/user.js
import { Schema, Types, model } from "mongoose";

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
      required: false,
    },
    rol: {
      type: Schema.Types.ObjectId,
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
  { collection: "user" }
);

export default model("Usuario", usuarioSchema);
