import { Schema, model } from "mongoose";

const medicamentoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  dosis: { type: String, required: true },
  indicaciones: { type: String, required: true },
});
const examenFisicoSchema = new mongoose.Schema({
  signosVitales: { type: String, required: true },
  hallazgos: [{ type: String }],
});
const diagnosticoSchema = new mongoose.Schema(
  {
    diagnostico_id: { type: String, required: true, unique: true },
    medicalId: {
      type: Types.ObjectId,
      ref: "Medical",
      required: true,
    },
    patientId: {
      type: Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    fecha: { type: Date, required: true },
    motivoConsulta: { type: String, required: true },
    diagPrincipal: { type: String, required: true },
    diagSecundario: [{ type: String }],
    historia: { type: String },
    examenFisico: examenFisicoSchema,
    evoClinica: { type: String },
    medicamentos: [medicamentoSchema],
  },
  { collection: "diagnostico" }
);
export default model("Diagnostico", diagnosticoSchema);
