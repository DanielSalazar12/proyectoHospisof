import { Schema, model } from "mongoose";
const patientSchema = new Schema(
  {
    nombrePaciente: {
      type: String,
      required: true,
    },
    documento: {
      type: Number,
      required: true,
    },
    emailPaciente: {
      type: String,
      required: true,
    },
    telefonoPaciente: {
      type: Number,
      required: true,
    },
    fechaNacimiento: {
      type: Date,
      required: true,
    },
    epsPaciente: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
  },
  { collection: "pacientes" }
);
export default model("Patients", patientSchema);
