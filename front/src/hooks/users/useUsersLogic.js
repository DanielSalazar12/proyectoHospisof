import { useState, useEffect } from "react";
import Swal from "sweetalert2";

import { fetchUsers, fetchRoles } from "@/hooks/users/useUsersData";

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



    return {
        open,
        abrirModalUsers,
        formData,
        users,
        roles,
        handleChange,
    }

};
