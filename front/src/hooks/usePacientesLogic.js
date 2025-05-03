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

    const abrirModalUsuarios = () => setOpen(!open);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const cargarDatos = async () => {
        try {
            const pacientesData = await fetchPacientes();
            const rolesData = await fetchRoles();
            setPacientes(pacientesData);
            setRoles(rolesData);
        } catch (error) {
            console.error("Error al cargar datos:", error);
        }
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    const handleSubmit = async () => {
        if (!formData.nombre || !formData.documento || !formData.telefono || !formData.email || !formData.fechaNacimiento || !formData.eps || !formData.userName || !formData.passwordUser) {
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

            if (!usuarioCreado || !usuarioCreado.usuario._id) {
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

            await createPaciente(nuevoPaciente);

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
                const idUsuario = pacienteEliminado.result.idUsuario;

                await deleteUser(idUsuario);
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
        pacientes,
        roles,
        handleDelete,
    };
}
