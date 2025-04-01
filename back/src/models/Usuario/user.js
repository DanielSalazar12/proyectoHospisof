// models/Usuario/user.js
import { Schema, model } from "mongoose";

const usuarioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    email: {
      type: String,
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
