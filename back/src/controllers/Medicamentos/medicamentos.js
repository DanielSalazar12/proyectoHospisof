// controlador medico
import Medicamentos from "../../models/Medicamentos/medicamentos.js";

export const getAll = async () => {
  try {
    let listaMedicos = await Medicamentos.find().exec();
    return {
      estado: true,
      data: listaMedicos,
    };
  } catch (error) {
    return {
      estado: false,
      mensaje: `Error: ${error}`,
    };
  }
};

export const add = async (data) => {
  const medicalExist = await Medicamentos.findOne({
    codigo: data.codigo,
  });
  if (medicalExist) {
    return {
      estado: false,
      mensaje: "El Medicamento ya existe en el sistema",
    };
  }

  try {
    const medicalNuevo = new Medicamentos({
      nombre: data.nombre,
      codigo: data.codigo,
      presentacion: data.presentacion,
      descripcion: data.descripcion,
      concentracion: data.concentracion,
      formaFarmaceutica: data.formaFarma,
      viaAdminist: data.administracion,
      uniEnvase: data.envase,
      uniMedida: data.medida,
      stockDisponible: data.stock,
      fechaVencimiento: data.vencimiento,
      precioCompra: data.prCompra,
      precioVenta: data.prVenta,
      status: 1,
    });
    await medicalNuevo.save();
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
export const updateMedical = async (data) => {
  let id = data.id;
  let info = {
    nombre: data.nombre,
    codigo: data.codigo,
    presentacion: data.presentacion,
    descripcion: data.descripcion,
    concentracion: data.concentracion,
    formaFarmaceutica: data.formaFarma,
    viaAdminist: data.administracion,
    uniEnvase: data.envase,
    uniMedida: data.medida,
    stockDisponible: data.stock,
    fechaVencimiento: data.vencimiento,
    precioCompra: data.prCompra,
    precioVenta: data.prVenta,
  };
  try {
    let medicalUpdate = await Medicamentos.findByIdAndUpdate(id, info);
    return {
      estado: true,
      mensaje: "Actualizacion Exitosa!",
      result: medicalUpdate,
    };
  } catch (error) {
    return {
      estado: false,
      mensaje: `Error: ${error}`,
    };
  }
};
export const searchById = async (data) => {
  let id = data.id;
  try {
    let result = await Medicamentos.findById(id).exec();
    return {
      estado: true,
      mensaje: "Consulta Exitosa",
      result: result,
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
    let result = await Medicamentos.findByIdAndUpdate(id, { status: 0 });
    return {
      estado: true,
      result: result,
    };
  } catch (error) {
    return {
      estado: false,
      mensaje: `Error: ${error}`,
    };
  }
};

export const subirImagen = async (req, res) => {
  try {
    // Validar si se subió un archivo
    if (!req.file) {
      return res.status(400).json({
        estado: false,
        mensaje: "No se ha subido ninguna imagen",
      });
    }

    const { originalname, filename, path } = req.file;
    const extension = originalname.split(".").pop().toLowerCase();
    // Validar extensión de la imagen
    const extensionesValidas = ["png", "jpg", "jpeg", "gif"];
    if (!extensionesValidas.includes(extension)) {
      await unlink(path); // Eliminar archivo inválido
      return res.status(400).json({
        estado: false,
        mensaje: "Extensión de archivo no permitida",
      });
    }

    // Actualizar usuario con la imagen subida
    const usuarioActualizado = await _findByIdAndUpdate(req.body.id, {
      imagen: filename,
    });

    return res.status(200).json({
      estado: true,
      user: usuarioActualizado,
      //file: req.file,
    });
  } catch (error) {
    return res.status(500).json({
      estado: false,
      nensaje: "Error al procesar la imagen",
      error: error.message,
    });
  }
};
