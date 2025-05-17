// controlador medico
import Medicamentos from "../../models/Medicamentos/medicaments.js";
// node nativo : fs : filessystem instanciamos para manipular el sistema de archivos del servidor
import fs from "fs";
// modulo nativo de node util para manejar las rutas
import path from "path";

export const getAll = async (limit, page) => {
  const baseUrl = `http://127.0.0.1:3000/api/medicaments/list`;

  const paginaActual = parseInt(page) || 1;
  const porPagina = parseInt(limit) || 10;

  const totalElementos = await Medicamentos.countDocuments();
  const totalPaginas = Math.ceil(totalElementos / porPagina);
  const buildUrl = (page) => `${baseUrl}/${page}/${porPagina}`;
  try {
    const medicos = await Medicamentos.find({ status: 1 })
      .skip((paginaActual - 1) * porPagina)
      .limit(porPagina);

    const paginacion = {
      paginaActual: paginaActual,
      totalPaginas: totalPaginas,
      porPagina: porPagina,
      totalElementos: totalElementos,
      siguiente: paginaActual < totalPaginas ? paginaActual + 1 : null,
      anterior: paginaActual > 1 ? paginaActual - 1 : null,
      primera: 1,
      ultima: totalPaginas,
      siguienteUrl: paginaActual < totalPaginas ? buildUrl(paginaActual + 1) : null,
      anteriorPageUrl: paginaActual > 1 ? buildUrl(paginaActual - 1) : null,
      primeraUrl: buildUrl(1),
      ultimaUrl: buildUrl(totalPaginas)
    };
    return {
      estado: true,
      data: medicos,
      paginacion
    };
  } catch (error) {
    return {
      estado: false,
      mensaje: `Error: ${error}`
    };
  }
};
export const getList = async () => {
  try {
    let listaMedicamentos = await Medicamentos.find({ status: 1 })
      .select("nombre _id codigo")
      .exec();
    return {
      estado: true,
      data: listaMedicamentos
    };
  } catch (error) {
    return {
      estado: false,
      mensaje: `Error: ${error}`
    };
  }
};
export const renderImagen = async (img) => {
  const file = img;
  const filepath = "./src/uploads/medicamentos/" + file;
  await fs.stat(filepath, (error, exists) => {
    if (!exists) {
      return {
        status: false,
        message: `No existe la imagen: ${error}}`
      };
    }
    // Devolver un file
    return sendFile(path.resolve(filepath));
  });
};
export const add = async (data, file) => {
  const extensionesValidas = ["png", "jpg", "jpeg", "gif"];
  const medicamentExist = await Medicamentos.findOne({
    codigo: data.codigo
  });
  let image = "";
  if (file) {
    const extension = path.extname(file.originalname).slice(1).toLowerCase();

    if (!extensionesValidas.includes(extension)) {
      fs.unlink(file.path);
      return {
        estado: false,
        mensaje: "Extensión de archivo no permitida"
      };
    }
    image = file.filename;
  }
  if (medicamentExist) {
    if (file) {
      const imagePath = path.join(file.destination, image);
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Error al eliminar imagen por médicamento exitesnte:", err);
      });
    }
    return {
      estado: false,
      mensaje: "El Medicametno ya existe en el sistema"
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
      imagen: image,
      precioCompra: data.prCompra,
      precioVenta: data.prVenta,
      status: 1
    });
    await medicalNuevo.save();
    return {
      estado: true,
      mensaje: "Medicamento Registrado exitosamente"
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
      mensaje: `Error: ${error}`
    };
  }
};
export const updateMedicament = async (data, file, id) => {
  const extensionesValidas = ["png", "jpg", "jpeg", "gif"];
  let image = "";
  if (file) {
    const extension = path.extname(file.originalname).slice(1).toLowerCase();
    if (!extensionesValidas.includes(extension)) {
      fs.unlink(file.path);
      return {
        estado: false,
        mensaje: "Extensión de archivo no permitida"
      };
    }
    image = file.filename;
  }
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
    imagen: image,
    precioCompra: data.prCompra,
    precioVenta: data.prVenta
  };
  try {
    let medicalUpdate = await Medicamentos.findByIdAndUpdate(id, info);
    console.log(medicalUpdate);
    console.log("id: " + id);
    return {
      estado: true,
      mensaje: "Actualizacion Exitosa!",
      data: medicalUpdate
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
      mensaje: `Error: ${error}`
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
      result: result
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
    let result = await Medicamentos.findByIdAndUpdate(id, { status: 0 });
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
