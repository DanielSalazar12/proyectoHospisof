// src/hooks/useUsersData.js
import { useEffect, useState } from "react";
import axios from "axios";

export const useUsersData = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/usuario/listartodos")
            .then((res) => {
                console.log(" API:", res.data);
                setUsuarios(res.data.listarUsuarios || []); // por si llega vacio la perra
            })
            .catch((err) => console.error("Error al cargar usuarios:", err));
    }, []);

    return usuarios;
};

export const getRoles = () => {
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/roles/listarTodos")
            .then((res) => {
                console.log(" API de roles:", res.data);
                setRoles(res.data.listarRoles || []);
            })
            .catch((err) => console.error("Error al cargar roles:", err));
    }, []);

    return roles;
};
