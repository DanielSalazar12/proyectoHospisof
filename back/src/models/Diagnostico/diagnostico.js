import { Schema, model } from "mongoose";

const medicamentoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  dosis: { type: String, required: true },
  indicaciones: { type: String, required: true }
});

const examenFisicoSchema = new mongoose.Schema({
  signos_vitales: { type: String, required: true },
  hallazgos: [{ type: String }]
});
const diagnosticoSchema = new mongoose.Schema(
  {
    diagnostico_id: { type: String, required: true, unique: true },
    medical: {
      type: Types.ObjectId,
      ref: "Medical",
      required: true
    },
    patient: {
      type: Types.ObjectId,
      ref: "Patient",
      required: true
    },
    fecha: { type: Date, required: true },
    medico: {
      nombre: { type: String, required: true },
      eps: { type: String, required: true }
    },
    paciente: {
      nombre: { type: String, required: true },
      documento: { type: String, required: true }
    },
    motivo_consulta: { type: String, required: true },
    diagnostico_principal: { type: String, required: true },
    diagnosticos_secundarios: [{ type: String }],
    historia_enfermedad_actual: { type: String },
    examen_fisico: examenFisicoSchema,
    evolucion_clinica: { type: String },
    medicamentos: [medicamentoSchema]
  },
  { collection: "diagnostico" }
);
export default model("Diagnostico", diagnosticoSchema);
