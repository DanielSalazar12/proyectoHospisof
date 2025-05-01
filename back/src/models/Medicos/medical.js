import { Schema, model } from "mongoose";

const medicalShema = new Schema(
  {
    nombreMedico: {
      type: String,
      require: true
    },
    apellidoMedico: {
      type: String,
      require: true
    },
    documento: {
      type: Number,
      require: true
    },
    emailMedico: {
      type: String,
      require: true
    },
    telefono: {
      type: Number,
      require: true
    },
    fechaNacimiento: {
      type: String,
      require: true
    },
    especialidad: {
      type: String,
      require: true
    },
    foto: {
      type: String,
      require: true
    },
    status: {
      type: String,
      require: true
    }
  },
  { collection: "medicos" }
);
export default model("Medical", medicalShema);
