import Medical from "../../models/Medicos/medical.js";
import Usuario from "../../models/Usuario/user.js";
import fs from "fs";
import path from "path";

const user = async (nombre, apellido, documento, email, rol) => {
  const userName = `${nombre.substring(0, 3).toUpperCase()}${apellido.substring(
    0,
    2
  )}-${Math.floor(Math.random() * (999 - 0 + 1) + 0)}`;

  const userExists = await Usuario.findOne({ nombreUsuario: userName });
  const emailExits = await Usuario.findOne({ emailUser: email });
  if (userExists) {
    return {
      estado: false,
      mensaje: "El Usuario ya existe en el sistema",
    };
  }
  if (emailExits) {
    return {
      estado: false,
      mensaje: "El Email ya esta asociado a un Usuario",
    };
  }
  try {
    const newUser = new Usuario({
      nombreUsuario: userName,
      passwordUser: documento,
      emailUser: email,
      rol: rol,
      status: 1,
    });
    await newUser.save();
    return {
      estado: true,
      mensaje: "Usuario registrado exitosamente",
      usuario: newUser,
    };
  } catch (error) {
    return {
      estado: false,
      mensaje: `Error${error} `,
    };
  }
};

export const getAll = async (limit, page) => {
  const baseUrl = `http://127.0.0.1:3000/api/medical/list`;

  const paginaActual = parseInt(page) || 1;
  const porPagina = parseInt(limit) || 10;

  const totalElementos = await Medical.countDocuments();
  const totalPaginas = Math.ceil(totalElementos / porPagina);
  const buildUrl = (page) => `${baseUrl}/${page}/${porPagina}`;
  try {
    const medicos = await Medical.find({ status: 1 })
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
      siguienteUrl:
        paginaActual < totalPaginas ? buildUrl(paginaActual + 1) : null,
      anteriorPageUrl: paginaActual > 1 ? buildUrl(paginaActual - 1) : null,
      primeraUrl: buildUrl(1),
      ultimaUrl: buildUrl(totalPaginas),
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
    const res = await user(
      data.nombre,
      data.apellido,
      data.documento,
      data.email,
      data.rol
    );

    if (res.estado === false) {
      if (file) {
        const imagePath = path.join(file.destination, image);
        fs.unlink(imagePath, (err) => {
          if (err)
            console.error("Error al eliminar la imagen tras fallo:", err);
        });
      }
      return {
        estado: false,
        mensaje: res.mensaje,
      };
    }

    console.log("usuario: ", res.usuario._id);
    const medicalNuevo = new Medical({
      nombreMedico: data.nombre,
      apellidoMedico: data.apellido,
      documento: data.documento,
      emailMedico: data.email,
      telefono: data.telefono,
      fechaNacimiento: data.fechaNacimiento,
      especialidad: data.especialidad,
      foto: image,
      idUsuario: res.usuario._id,
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
    telefono: data.telefono,
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
