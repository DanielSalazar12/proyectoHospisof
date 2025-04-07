import Usuario, {
  find,
  findOne,
  findByIdAndUpdate,
  findById,
  findOneAndDelete,
} from "../models/usuarios.js";
import { hashSync, compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { unlink, stat } from "fs";
import { resolve } from "path";
import { findByIdAndUpdate as _findByIdAndUpdate } from "../models/usuarios.js";

export const getUsuarios = async (req, res) => {
  try {
    let listaUsuarios = await find().exec();
    res.status(200).send({
      Exito: true,
      data: listaUsuarios,
      mensaje: "Exito en la consulta",
    });
  } catch (error) {
    res.status(500).send({
      Exito: false,
      mensaje: "Error, en la consulta.",
    });
  }
};

const setUsuario = async (req, res) => {
  let data = {
    nombre: req.body.nombre,
    email: req.body.email,
    passwordHash: hashSync(req.body.passwordHash, 10),
    telefono: req.body.telefono,
    esAdmin: req.body.esAdmin,
    direccion: req.body.direccion,
    zip: req.body.zip,
    ciudad: req.body.ciudad,
    pais: req.body.pais,
  };

  const usuarioExiste = await findOne({ email: data.email });

  if (usuarioExiste) {
    return res.send({
      estado: false,
      mensaje: "el usuario ya existe en el sistema",
    });
  }

  try {
    const usuarioNuevo = new Usuario(data);
    await usuarioNuevo.save();
    return res.send({
      estado: true,
      mensaje: "usuario creado exitosamente",
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: `error ${error}`,
    });
  }
};
const updateUsuario = async (req, res) => {
  let id = req.params.id;
  let data = {
    nombre: req.body.nombre,
    email: req.body.email,
    telefono: req.body.telefono,
    esAdmin: req.body.esAdmin,
    direccion: req.body.direccion,
    zip: req.body.zip,
    ciudad: req.body.ciudad,
    pais: req.body.pais,
  };
  try {
    let usuarioUpdate = await findByIdAndUpdate(id, data);
    return res.send({
      estado: true,
      mensaje: "Actualizacion Exitosa!",
      reslut: usuarioUpdate,
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: `Error en la Actualizacion: ${error}`,
    });
  }
};
const searchById = async (req, res) => {
  let id = req.params.id;

  try {
    let result = await findById(id).exec();
    return res.send({
      estado: true,
      mensaje: "Consulta Exitosa",
      result: result,
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: "Error, No fue posible encotrar el registro.",
    });
  }
};
export const deleteById = async (req, res) => {
  let id = req.params.id;

  try {
    let result = await findOneAndDelete(id).exec();
    return res.send({
      estado: true,
      mensaje: "Borrado Exitoso",
      result: result,
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: "Error, Nos fue posible eliminar el producto.",
    });
  }
};

export const login = async (req, res) => {
  let usuarioExiste = await findOne({ email: req.body.email });
  if (!usuarioExiste) {
    return res.send({
      estado: false,
      mensaje: "no existe el usuario",
    });
  }

  // validamos credemciales
  if (compareSync(req.body.password, usuarioExiste.passwordHash)) {
    //autenticacion de 2 factores con generacion de token

    const token = sign(
      // datos a codificar en le toke
      {
        userId: usuarioExiste.id,
        isAdmin: usuarioExiste.esAdmin,
      },
      // Salt de la codificacion o hashing
      "seCreTo",
      // vida util
      { expiresIn: "4h" }
    );
    return res.send({
      estado: true,
      mensaje: "ok",
      token: token,
    });
  } else {
    return res.send({
      estado: false,
      mensaje: "Contraseña incorrecta , Intente de nuevo !",
    });
  }
};
//sube la imagen del usuario

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

// retorna la ruta de la imagen
export const avatar = (req, res) => {
  // Sacar el parametro de la url
  const file = req.params.file;

  // Montar el path real de la imagen
  const filePath = "./uploads/usuarios/" + file;

  // Comprobar que existe
  stat(filePath, (error, exists) => {
    if (!exists) {
      return res.status(404).send({
        status: "error",
        message: "No existe la imagen",
      });
    }

    // Devolver un file
    return res.sendFile(resolve(filePath));
  });
};
