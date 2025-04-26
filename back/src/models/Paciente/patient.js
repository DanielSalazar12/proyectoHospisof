import { Schema, model, Types } from "mongoose"; // Importa Types aquí

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
    idUsuario: {
      type: Types.ObjectId, // Esto es para la foránea de Usuarios
      ref: "Usuario",
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
