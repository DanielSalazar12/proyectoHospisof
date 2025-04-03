import { Schema, model } from "mongoose";
const medicalSchema = new Schema(
  {
    nombreMedico: {
      type: String,
      required: true,
    },
    emailMedico: {
      type: String,
      required: true,
    },
    telefonoMedico: {
      type: Number,
      required: true,
    },
    especialidadMedico: {
      type: String,
      required: true,
    },
  },
  { collection: "medicos" }
);
export default model("Medicals", medicalSchema);
