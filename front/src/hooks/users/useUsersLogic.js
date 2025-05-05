import { useState, useEffect } from "react";
import Swal from "sweetalert2";

import { fetchUsers, fetchRoles, deleteUser } from "@/hooks/users/useUsersData";

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


    const abrirModalUsers = () => {
        if (open) {
            // Si se está cerrando la modal, reseteamos todo
            setFormData(initialForm);
        }
        setOpen(!open);
    }


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

    return {
        open,
        abrirModalUsers,
        formData,
        users,
        roles,
        handleChange,
        handleDelete,
    }

};
