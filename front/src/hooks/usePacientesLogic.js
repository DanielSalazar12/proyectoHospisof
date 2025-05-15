// src/hooks/usePacientesLogic.js
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  fetchPacientes,
  createUser,
  createPaciente,
  fetchRoles,
  deleteUser,
  deletePaciente,
  getPacienteId,
  updatePaciente,
  updateUser,
} from "@/hooks/usePacientesData";

const initialForm = {
  nombre: "",
  documento: "",
  email: "",
  telefono: "",
  fechaNacimiento: "",
  eps: "",
  userName: "",
  passwordUser: "",
  rol: "",
  estadoCivil: "",
  sexo: "",
  direccion: "",
};

export function usePacientesLogic() {
  const [pacientes, setPacientes] = useState([]);
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [open, setOpen] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idPacienteActual, setIdPacienteActual] = useState(null);
  const [idUsuarioActual, setIdUsuarioActual] = useState(null);

  const abrirModalUsuarios = () => {
    if (open) {
      // Si se está cerrando la modal, reseteamos todo
      setFormData(initialForm);
      setModoEdicion(false);
      setIdPacienteActual(null);
      setIdUsuarioActual(null);
    }
    setOpen(!open);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const cargarDatos = async () => {
    try {
      const [pacientesData, rolesData] = await Promise.all([
        fetchPacientes(),
        fetchRoles(),
      ]);
      setPacientes(pacientesData);
      setRoles(rolesData);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleEditClick = async (id) => {
    try {
      const paciente = await getPacienteId(id);

      setFormData({
        nombre: paciente.nombrePaciente || "",
        documento: paciente.documento || "",
        email: paciente.idUsuario?.emailUser || "",
        telefono: paciente.telefonoPaciente || "",
        fechaNacimiento: paciente.fechaNacimiento
          ? new Date(paciente.fechaNacimiento).toISOString().split("T")[0]
          : "", // Convercion para que me convierta la fecha y me la traiga
        eps: paciente.epsPaciente || "",
        userName: paciente.idUsuario?.nombreUsuario || "",
        passwordUser: paciente.idUsuario?.passwordUser || "",
        rol: paciente.idUsuario?.rol || "",
        estadoCivil: paciente.estadoCivil || "",
        sexo: paciente.sexo || "",
        direccion: paciente.direccion || "",
      });

      setIdPacienteActual(paciente._id);
      setIdUsuarioActual(paciente.idUsuario?._id);
      setModoEdicion(true);
      setOpen(true);
    } catch (error) {
      console.error("Error al cargar paciente:", error);
      Swal.fire("Error", "No se pudo cargar el paciente", "error");
    }
  };

  // ----------------------------------------------------Insercion doble y manejador de submit-------------------------
  const handleSubmit = async () => {
    const camposRequeridos = [
      "nombre",
      "documento",
      "telefono",
      "email",
      "fechaNacimiento",
      "eps",
      "userName",
      "passwordUser",
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
      const nuevoUsuario = {
        nombreUsuario: formData.userName,
        passwordUser: formData.passwordUser,
        emailUser: formData.email,
        rol: formData.rol,
        status: 1,
      };

      const usuarioCreado = await createUser(nuevoUsuario);

      if (!usuarioCreado.estado) {
        setOpen(false);
        setFormData(initialForm);
        setModoEdicion(false);
        setIdPacienteActual(null);
        setIdUsuarioActual(null);
        Swal.fire({
          icon: "error",
          title: "Error al registrar usuario",
          text: usuarioCreado.mensaje || "No se pudo registrar el usuario.",
        });
        return;
      }

      if (!usuarioCreado?.usuario?._id) {
        Swal.fire({
          icon: "error",
          title: "Error al crear usuario",
          text: "No se pudo obtener el ID del usuario creado.",
        });
        return;
      }

      const nuevoPaciente = {
        nombre: formData.nombre,
        fecha: formData.fechaNacimiento,
        documento: Number(formData.documento),
        telefono: Number(formData.telefono),
        eps: formData.eps,
        idUsuario: usuarioCreado.usuario._id,
        estadoCivil: formData.estadoCivil,
        sexo: formData.sexo,
        direccion: formData.direccion,
      };

      const resultadoPaciente = await createPaciente(nuevoPaciente);

      if (!resultadoPaciente.estado) {
        //Reseteo el form
        setOpen(false);
        setFormData(initialForm);
        setModoEdicion(false);
        setIdPacienteActual(null);
        setIdUsuarioActual(null);
        Swal.fire({
          icon: "error",
          title: "Error al registrar paciente",
          text:
            resultadoPaciente.mensaje || "No se pudo registrar el paciente.",
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Paciente registrado",
        text: "El paciente fue creado exitosamente.",
        confirmButtonColor: "#3085d6",
      });

      abrirModalUsuarios();
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

  // -----------------------------------------------Editar-----------------------------------------------------------------

  const handleUpdate = async () => {
    const camposRequeridos = [
      "nombre",
      "documento",
      "telefono",
      "email",
      "fechaNacimiento",
      "eps",
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
      const usuarioActualizado = {
        nombreUsuario: formData.userName,
        passwordUser: formData.passwordUser,
        emailUser: formData.email,
        rol: formData.rol,
        status: 1,
      };

      await updateUser(idUsuarioActual, usuarioActualizado);

      const pacienteActualizado = {
        id: idPacienteActual,
        nombre: formData.nombre,
        fecha: formData.fechaNacimiento,
        documento: Number(formData.documento),
        telefono: Number(formData.telefono),
        eps: formData.eps,
        estadoCivil: formData.estadoCivil,
        sexo: formData.sexo,
        direccion: formData.direccion,
      };

      await updatePaciente(idPacienteActual, pacienteActualizado);

      Swal.fire({
        icon: "success",
        title: "Paciente actualizado",
        text: "Los datos fueron actualizados exitosamente.",
      });

      abrirModalUsuarios();
      setFormData(initialForm);
      setModoEdicion(false);
      await cargarDatos();
    } catch (error) {
      console.error("Error al actualizar:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar el paciente.",
      });
    }
  };

  const handleDelete = async (idPaciente) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esto eliminará el paciente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const pacienteEliminado = await deletePaciente(idPaciente);
        const idUsuario = pacienteEliminado?.result?.idUsuario;

        if (idUsuario) {
          await deleteUser(idUsuario);
        }

        await cargarDatos();

        Swal.fire({
          icon: "success",
          title: "Paciente eliminado",
          text: "El paciente fue eliminado correctamente.",
        });
      } catch (error) {
        console.error("Error al eliminar:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar el paciente.",
        });
      }
    }
  };

  return {
    open,
    abrirModalUsuarios,
    formData,
    handleChange,
    handleSubmit,
    handleEditClick,
    handleUpdate,
    pacientes,
    roles,
    handleDelete,
    modoEdicion,
    idPacienteActual,
    idUsuarioActual,
  };
}
