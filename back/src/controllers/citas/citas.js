import Citas from "../../models/citas/citas.js";
import { Types } from "mongoose";

const getAll = async (req, res) => {
  try {
    let listaCita = await Citas.find().populate("medicoId").populate("pacienteId").
      exec();
    res.status(200).send({
      exito: true,
      listaCita,
    });
  } catch (error) {
    res.status(500).send({
      exito: false,
      mensaje: "Error en la consulta",
    });
  }
};

export const nuevo = async (req, res) => {
  let datos = {
    pacienteId: req.body.pacienteId,
    medicoId: req.body.medicoId,
    fechaCita: req.body.fechaCita,
    horaCita: req.body.horaCita,
    motivo: req.body.motivo,
    notas: req.body.notas,
    tipoConsulta: req.body.tipoConsulta,
    fechaCreacion: req.body.fechaCreacion,
    status: req.body.status || 1,
  };

  try {
    const citaNuevo = new Citas(datos);
    await citaNuevo.save();

    return res.send({
      estado: true,
      mensaje: "Inserción exitosa",
      usuario: citaNuevo,
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: `Ha ocurrido un error en la consulta: ${error}`,
    });
  }
};

export default {
  getAll,
  nuevo,
};
