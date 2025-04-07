import Usuarios from "../../models/Usuario/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Funciones de la librería

const listarTodos = async (req, res) => {
  try {
    // Consultar todos sin filtro
    const listarUsuarios = await Usuarios.find().exec();
    res.status(200).send({
      exito: true,
      listarUsuarios,
    });
  } catch (error) {
    res.status(500).send({
      exito: false,
      mensaje: "Error en la consulta",
    });
  }
};

const nuevo = async (req, res) => {
  let datos = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    telefono: req.body.telefono,
    especialidad: req.body.especialidad,
    rol: req.body.rol,
    userName: req.body.userName,
    passwordUser: req.body.passwordUser,
  };

  try {
    const usuarioNuevo = new Usuarios(datos);

    usuarioNuevo.save(); //Escribe el mongo

    return res.send({
      estado: true,
      mensaje: `Insercion exitosa`,
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: `A ocurrido un error en la consulta ${error}`,
    });
  }
};

const buscarPorId = async (req, res) => {
  let id = req.params.id;

  try {
    //Logica de buscar  mostrar el resultado
    //let consulta = await producto.find(id).exec();
    let consulta = await Usuarios.findById(id).exec();

    return res.send({
      estado: true,
      mensaje: `Busqueda exitosa`,
      consulta: consulta,
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: `Error, no se pudo realizar la consulta`,
    });
  }
};

//Actualizar de acuerdo al producto al id del producto

const actualizarPorId = async (req, res) => {
  //Recibe el parametro de la consulta

  let id = req.params.id;

  let datos = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    telefono: req.body.telefono,
    especialidad: req.body.especialidad,
    rol: req.body.rol,
    userName: req.body.userName,
    passwordUser: req.body.passwordUser,
  };

  try {
    let consulta = await Usuarios.findByIdAndUpdate(id, datos).exec();
    return res.send({
      estado: true,
      mensaje: `Actualizacion exitosa`,
      consulta: consulta,
    });
  } catch (error) {
    return res.send({
      estado: true,
      mensaje: `Error al actualizar`,
      consulta: consulta,
    });
  }
};

const eliminarPorId = async (req, res) => {
  let id = req.params.id;

  try {
    //Logica de buscar  mostrar el resultado
    //let consulta = await producto.find(id).exec();
    let consulta = await Usuarios.findOneAndDelete({ _id: id }).exec();

    return res.send({
      estado: true,
      mensaje: `Eliminacion exitosa`,
      consulta: consulta,
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: `Error, no se pudo realizar la consulta`,
    });
  }
};

export default {
  listarTodos,
  nuevo,
  buscarPorId,
  actualizarPorId,
  eliminarPorId,
};
