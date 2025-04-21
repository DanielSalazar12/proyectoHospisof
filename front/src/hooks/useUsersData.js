// src/hooks/useUsersData.js
import axios from "axios";

export const fetchUsers = async () => {
    try {
        const res = await axios.get("http://localhost:3000/api/usuario/listartodos");
        return res.data.listarUsuarios || [];
    } catch (err) {
        console.error("Error al cargar usuarios:", err);
        return [];
    }
};

export const fetchRoles = async () => {
    try {
        const res = await axios.get("http://localhost:3000/api/roles/listarTodos");
        return res.data.listarRoles || [];
    } catch (err) {
        console.error("Error al cargar roles:", err);
        return [];
    }
};

export const createUser = async (formData) => {
    try {
        const response = await axios.post("http://localhost:3000/api/usuario/nuevo", formData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3000/api/usuario/eliminar/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        throw error;
    }
};
