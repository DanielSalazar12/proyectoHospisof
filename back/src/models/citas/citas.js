import { Schema, model, Types } from "mongoose"; // Importa Types aquí

const citasSchema = new Schema(
  {
    pacienteId: {
      type: Types.ObjectId,
      ref: "Patients",
      required: true,
    },
    medicoId: {
      type: Types.ObjectId,
      ref: "Medical",
      required: true,
    },
    fechaCita: {
      type: Date,
      required: true,
    },
    horaCita: {
      type: String,
      required: true,
    },
    motivo: {
      type: String,
      required: true,
    },
    notas: {
      type: String,
    },
    tipoConsulta: {
      type: String,
      required: true,
    },
    fechaCreacion: {
      type: Date,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
  },
  { collection: "citas" }
);

export default model("Citas", citasSchema);
