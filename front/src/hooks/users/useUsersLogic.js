import { useState, useEffect } from "react";
import Swal from "sweetalert2";

import {
  fetchUsers,
  fetchRoles,
  deleteUser,
  fetchValidacionDelete,
  createUser,
  getUserId,
  updateUser,
} from "@/hooks/users/useUsersData";

import { deletePaciente } from "@/hooks/usePacientesData";

const initialForm = {
  nombreUsuario: "",
  passwordUser: "",
  email: "",
  rol: "",
};

export const useUsersLogic = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idUserActual, setIdUserActual] = useState(null);

  const abrirModalUsers = () => {
    if (open) {
      // Si se está cerrando la modal, reseteamos todo
      setFormData(initialForm);
      setModoEdicion(false);
      setIdUserActual(null);
    }
    setOpen(!open);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const cargarDatos = async () => {
    try {
      const [usersData, rolesData] = await Promise.all([
        fetchUsers(),
        fetchRoles(),
      ]);
      setUsers(usersData);
      setRoles(rolesData);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };
  useEffect(() => {
    cargarDatos();
  }, []);

  // ----------------------------------------------------Insercion -------------------------
  const handleSubmit = async () => {
    const camposRequeridos = [
      "nombreUsuario",
      "passwordUser",
      "emailUser",
      "rol",
    ];

    // Validacion de entrada de datos

    const camposVacios = camposRequeridos.filter((campo) => !formData[campo]);

    if (camposVacios.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos antes de continuar.",
      });
      return;
    }

    try {
      const nuevoUsuario = {
        nombreUsuario: formData.nombreUsuario,
        passwordUser: formData.passwordUser,
        emailUser: formData.emailUser,
        rol: formData.rol,
        status: 1,
      };

      await createUser(nuevoUsuario);

      Swal.fire({
        icon: "success",
        title: "Paciente registrado",
        text: "El usuario fue creado exitosamente.",
        confirmButtonColor: "#3085d6",
      });

      abrirModalUsers();
      setFormData(initialForm);
      await cargarDatos();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocurrió un error al insertar!",
      });
    }
  };

  //=======================================Fcuncion de editar, traer los datos =======================================

  const handleEditClick = async (id) => {
    try {
      const user = await getUserId(id);

      setFormData({
        nombreUsuario: user.nombreUsuario || "",
        emailUser: user.emailUser || "",
        passwordUser: user.passwordUser || "",
        rol: user.rol || "",
      });

      setIdUserActual(user._id);
      setModoEdicion(true);
      setOpen(true);
    } catch (error) {
      console.error("Error al cargar el usuario:", error);
      Swal.fire("Error", "No se pudo cargar el usuario", "error");
    }
  };

  //=========================================================================

  const handleDelete = async (idUser) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esto eliminará el usuario.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const pacienteRelacionado = await fetchValidacionDelete(idUser);

        if (pacienteRelacionado) {
          await deletePaciente(pacienteRelacionado._id);
        }

        await deleteUser(idUser);
        await cargarDatos();

        Swal.fire({
          icon: "success",
          title: "Usuario eliminado",
          text: "El usuario fue eliminado correctamente.",
        });
      } catch (error) {
        console.error("Error al eliminar:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar el usuario.",
        });
      }
    }
  };

  //================================================Editar==========================

  const handleUpdate = async () => {
    const camposRequeridos = [
      "nombreUsuario",
      "passwordUser",
      "emailUser",
      "rol",
    ];

    const camposVacios = camposRequeridos.filter((campo) => !formData[campo]);

    if (camposVacios.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos antes de continuar.",
      });
      return;
    }

    try {
      const userActualizado = {
        nombreUsuario: formData.nombreUsuario,
        passwordUser: formData.passwordUser,
        emailUser: formData.emailUser,
        rol: formData.rol,
        status: 1,
      };

      console.log(idUserActual, userActualizado);
      await updateUser(idUserActual, userActualizado);

      Swal.fire({
        icon: "success",
        title: "Usuario actualizado",
        text: "Los datos fueron actualizados exitosamente.",
      });

      abrirModalUsers();
      setFormData(initialForm);
      setModoEdicion(false);
      await cargarDatos();
    } catch (error) {
      console.error("Error al actualizar:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar el usuario.",
      });
    }
  };

  return {
    open,
    abrirModalUsers,
    formData,
    users,
    roles,
    handleChange,
    handleDelete,
    handleSubmit,
    handleEditClick,
    modoEdicion,
    idUserActual,
    handleUpdate,
  };
};
