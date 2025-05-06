// controlador medico
import Diagnostico from "../../models/Diagnostico/diagnostico.js";

export const getAll = async (data) => {
  try {
    const listaDiagnosticos = await Diagnostico.find({ status: 1 })
      .populate({
        path: "patientId",
        match: { documento: data.documento },
      })
      .exec();
    return {
      estado: true,
      data: listaDiagnosticos,
    };
  } catch (error) {
    return {
      estado: false,
      mensaje: `Error: ${error}`,
    };
  }
};

export const add = async (data) => {
  try {
    const diagnosticoNuevo = new Diagnostico({
      fecha: data.fecha,
      medicalId: data.medicoId,
      patientId: data.pacienteId,
      motivoConsulta: data.motivoConsulta,
      diagPrincipal: data.diagPrincipal,
      diagSecundario: data.diagSecundario,
      historia: data.historia,
      examenFisico: data.examenFisico,
      evoClinica: data.evoClinica,
      medicamentos: data.medicamentos,
      status: 1,
    });
    await diagnosticoNuevo.save();
    return {
      estado: true,
      mensaje: "Medicamento Registrado exitosamente",
    };
  } catch (error) {
    return {
      estado: false,
      mensaje: `Error: ${error}`,
    };
  }
};
export const deleteById = async (data) => {
  let id = data.id;
  try {
    let result = await Diagnostico.findByIdAndUpdate(id, { status: 0 });
    return {
      estado: true,
      data: result,
    };
  } catch (error) {
    return {
      estado: false,
      mensaje: `Error: ${error}`,
    };
  }
};
