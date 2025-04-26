// src/hooks/useUsersData.js
import axios from "axios";

export const fetchPacientes = async () => {
    try {
        const res = await axios.get("http://localhost:3000/api/patient/list");
        return res.data.data || [];
    } catch (err) {
        console.error("Error al cargar pacientes:", err);
        return [];
    }
};

export const fetchUsers = async () => {
    try {
        const res = await axios.get("http://localhost:3000/api/usuario/listartodos");
        return res.data.listarUsuarios || [];
    } catch (err) {
        console.error("Error al cargar roles:", err);
        return [];
    }
};

export const createPaciente = async (formData) => {
    try {
        const response = await axios.post("http://localhost:3000/api/patient/create", formData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updatePaciente = async (id, formData) => {
    try {
        const response = await axios.post(`http://localhost:3000/api/patient/update`, formData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getUserId = async (id) => {
    try {
        const res = await axios.get(`http://localhost:3000/api/usuario/listarPorId/${id}`);
        return res.data.consulta || [];
    } catch (err) {
        console.error("Error al cargar roles:", err);
        return [];
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
