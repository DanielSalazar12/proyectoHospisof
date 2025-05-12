// controlador medico
import Diagnostico from "../../models/Diagnostico/diagnostico.js";
import Patients from "../../models/Paciente/patient.js";

export const getAll = async (documento, limit, page) => {
  const paginaActual = parseInt(page) || 1;
  const porPagina = parseInt(limit) || 3;

  if (documento) {
    try {
      const paciente = await Patients.findOne({ documento: Number(documento) });
      if (!paciente) {
        return {
          estado: false,
          mensaje: `El paciente no existe en el sistema`
        };
      }

      const totalElementos = await Diagnostico.countDocuments({
        patientId: paciente._id,
        status: "1"
      });
      const totalPaginas = Math.ceil(totalElementos / porPagina);

      const listaDiagnosticos = await Diagnostico.find({ patientId: paciente._id, status: "1" })
        .skip((paginaActual - 1) * porPagina)
        .limit(porPagina);

      return {
        estado: true,
        data: listaDiagnosticos,
        paginacion: {
          paginaActual,
          totalPaginas,
          porPagina,
          totalElementos,
          siguiente: paginaActual < totalPaginas ? paginaActual + 1 : null,
          anterior: paginaActual > 1 ? paginaActual - 1 : null
        }
      };
    } catch (error) {
      return {
        estado: false,
        mensaje: `Error: ${error.message}`
      };
    }
  }

  return {
    estado: false,
    mensaje: "Documento es requerido para la búsqueda"
  };
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
      status: 1
    });
    await diagnosticoNuevo.save();
    return {
      estado: true,
      mensaje: "Se registro el Diagnostico Corectamente"
    };
  } catch (error) {
    return {
      estado: false,
      mensaje: `Error: ${error}`
    };
  }
};
export const deleteById = async (data) => {
  let id = data.id;
  try {
    let result = await Diagnostico.findByIdAndUpdate(id, { status: 0 });
    return {
      estado: true,
      data: result
    };
  } catch (error) {
    return {
      estado: false,
      mensaje: `Error: ${error}`
    };
  }
};
