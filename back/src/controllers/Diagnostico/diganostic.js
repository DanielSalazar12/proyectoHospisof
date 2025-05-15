// controlador medico
import Diagnostico from "../../models/Diagnostico/diagnostic.js";
import Patients from "../../models/Paciente/patient.js";

export const getAll = async (documento, limit, page) => {
  const baseUrl = `http://127.0.0.1:3000/api/diagnostic/list`;

  const paginaActual = parseInt(page) || 1;
  const porPagina = parseInt(limit) || 3;
  const buildUrl = (page) => `${baseUrl}/${page}/${porPagina}`;
  if (documento) {
    try {
      const paciente = await Patients.findOne({ documento: Number(documento) });
      if (!paciente) {
        return {
          estado: false,
          mensaje: `El paciente no existe en el sistema`,
        };
      }
      const totalElementos = await Diagnostico.countDocuments({
        patientId: paciente._id,
        status: "1",
      });
      const totalPaginas = Math.ceil(totalElementos / porPagina);

      const listaDiagnosticos = await Diagnostico.find({
        patientId: paciente._id,
        status: "1",
      })
        .skip((paginaActual - 1) * porPagina)
        .limit(porPagina);

      return {
        estado: true,
        data: listaDiagnosticos,
        paginacion: {
          paginaActual: paginaActual,
          totalPaginas: totalPaginas,
          porPagina: porPagina,
          totalElementos: totalElementos,
          siguiente: paginaActual < totalPaginas ? paginaActual + 1 : null,
          anterior: paginaActual > 1 ? paginaActual - 1 : null,
          primera: 1,
          ultima: totalPaginas,
          siguienteUrl:
            paginaActual < totalPaginas ? buildUrl(paginaActual + 1) : null,
          anteriorPageUrl: paginaActual > 1 ? buildUrl(paginaActual - 1) : null,
          primeraUrl: buildUrl(1),
          ultimaUrl: buildUrl(totalPaginas),
        },
      };
    } catch (error) {
      return {
        estado: false,
        mensaje: `Error: ${error.message}`,
      };
    }
  }

  return {
    estado: false,
    mensaje: "Documento es requerido para la búsqueda",
  };
};

export const getMedicalDiagnostic = async (documento) => {
  if (documento) {
    try {
      const paciente = await Patients.findOne({ documento: Number(documento) });
      if (!paciente) {
        return {
          estado: false,
          mensaje: `El paciente no existe en el sistema`,
        };
      }
      const listaMedicos = await Diagnostico.find({
        patientId: paciente._id,
        status: "1",
      })
        .select("_id medicalId motivoConsulta")
        .populate({
          path: "medicalId",
          select: "nombreMedico especialidad foto",
        })
        .exec();

      return {
        estado: true,
        data: listaMedicos,
      };
    } catch (error) {
      return {
        estado: false,
        mensaje: `Error: ${error.message}`,
      };
    }
  }

  return {
    estado: false,
    mensaje: "Documento es requerido para la búsqueda",
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
      status: 1,
    });
    await diagnosticoNuevo.save();
    return {
      estado: true,
      mensaje: "Se registro el Diagnostico Corectamente",
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
