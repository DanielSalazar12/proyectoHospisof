import Medical from "../../models/Medicos/medical.js";
import fs from "fs";
import path from "path";
export const getAll = async (limit, page) => {
  const paginaActual = parseInt(page) || 1;
  const porPagina = parseInt(limit) || 10;

  const totalElementos = await Medical.countDocuments();
  const totalPaginas = Math.ceil(totalElementos / porPagina);
  console.log("Elementos: " + totalElementos);

  try {
    const medicos = await Medical.find({ status: 1 }).skip((paginaActual - 1) * porPagina).limit(porPagina);
    const paginacion = {
      paginaActual: paginaActual,
      totalPaginas: totalPaginas,
      porPagina: porPagina,
      totalElementos: totalElementos,
    };
    return {
      estado: true,
      data: medicos,
      paginacion,
    };
  } catch (error) {
    return {
      estado: false,
      mensaje: `Error: ${error}`,
    };
  }
};
export const renderImagen = async (img) => {
  const file = img;
  const filepath = "./src/uploads/medicos/" + file;
  await fs.stat(filepath, (error, exists) => {
    if (!exists) {
      return {
        status: false,
        message: `No existe la imagen: ${error}}`,
      };
    }

    return sendFile(path.resolve(filepath));
  });
};
export const add = async (data, file) => {
  const extensionesValidas = ["png", "jpg", "jpeg", "gif"];
  const medicalExist = await Medical.findOne({
    documento: data.documento,
  });
  let image = "";
  if (file) {
    const extension = path.extname(file.originalname).slice(1).toLowerCase();

    if (!extensionesValidas.includes(extension)) {
      fs.unlink(file.path);
      return {
        estado: false,
        mensaje: "Extensión de archivo no permitida",
      };
    }
    image = file.filename;
  }
  if (medicalExist) {
    if (file) {
      const imagePath = path.join(file.destination, image);
      fs.unlink(imagePath, (err) => {
        if (err)
          console.error("Error al eliminar imagen por médico existente:", err);
      });
    }
    return {
      estado: false,
      mensaje: "El Medico ya existe en el sistema",
    };
  }

  try {
    const medicalNuevo = new Medical({
      nombreMedico: data.nombre,
      apellidoMedico: data.apellido,
      documento: data.documento,
      emailMedico: data.email,
      fechaNacimiento: data.fechaNacimiento,
      especialidad: data.especialidad,
      foto: image,
      status: 1,
    });
    await medicalNuevo.save();
    return {
      estado: true,
      mensaje: "Medico Registrado exitosamente",
    };
  } catch (error) {
    if (file) {
      const imagePath = path.join(file.destination, image);
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Error al eliminar la imagen tras fallo:", err);
      });
    }
    return {
      estado: false,
      mensaje: `Error: ${error}`,
    };
  }
};
export const updateMedical = async (data, file, id) => {
  const extensionesValidas = ["png", "jpg", "jpeg", "gif"];
  let image = "";
  if (file) {
    const extension = path.extname(file.originalname).slice(1).toLowerCase();
    if (!extensionesValidas.includes(extension)) {
      fs.unlink(file.path);
      return {
        estado: false,
        mensaje: "Extensión de archivo no permitida",
      };
    }
    image = file.filename;
  }
  let info = {
    nombreMedico: data.nombre,
    apellidoMedico: data.apellido,
    documento: data.documento,
    emailMedico: data.email,
    fechaNacimiento: data.fechaNacimiento,
    especialidad: data.especialidad,
    foto: image,
  };
  try {
    let medicalUpdate = await Medical.findByIdAndUpdate(id, info);
    console.log(medicalUpdate);
    console.log("id: " + id);
    return {
      estado: true,
      mensaje: "Actualizacion Exitosa!",
      data: medicalUpdate,
    };
  } catch (error) {
    if (file) {
      const imagePath = path.join(file.destination, image);
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Error al eliminar la imagen tras fallo:", err);
      });
    }
    return {
      estado: false,
      mensaje: `Error: ${error}`,
    };
  }
};
export const searchById = async (data) => {
  let id = data.id;
  try {
    let result = await Medical.findById(id).exec();
    return {
      estado: true,
      mensaje: "Consulta Exitosa",
      data: result,
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
    let result = await Medical.findByIdAndUpdate(id, { status: 0 });
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
