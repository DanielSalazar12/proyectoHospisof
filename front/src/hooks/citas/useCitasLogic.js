import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { fetchCitas } from "@/hooks/citas/useCitasData";

const initialForm = {
    pacienteId: "",
    medicoId: "",
    fechaCita: "",
    horaCita: "",
    motivo: "",
    notas: "",
    tipoConsulta: "",
    fechaCreacion: "",
};

export const useCitasLogic = () => {
    const [open, setOpen] = useState(false);
    const [citas, setCitas] = useState([]);
    const [formData, setFormData] = useState(initialForm);

    const abrirModalCitas = () => {
        if (open) {
            // Si se está cerrando la modal, reseteamos todo
            setFormData(initialForm);
        }
        setOpen(!open);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const cargarDatos = async () => {
        try {
            const citasData = await fetchCitas(); // Llamada directa a fetchCitas
            setCitas(citasData); // Asignamos las citas obtenidas a setCitas
        } catch (error) {
            console.error("Error al cargar citas:", error);
        }
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    // ----------------------------------------------------Insercion -------------------------
    const handleSubmit = async () => {
        const camposRequeridos = [
            "pacienteId", "medicoId", "fechaCita", "horaCita", "motivo", "tipoConsulta",
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
            // Asegúrate de ajustar esta parte para la creación de una nueva cita.
            const nuevaCita = {
                pacienteId: formData.pacienteId,
                medicoId: formData.medicoId,
                fechaCita: formData.fechaCita,
                horaCita: formData.horaCita,
                motivo: formData.motivo,
                notas: formData.notas,
                tipoConsulta: formData.tipoConsulta,
                fechaCreacion: new Date().toISOString(),
            };

            // Aquí debes realizar la acción de creación, por ejemplo usando una API.
            // await createCita(nuevaCita); 
            // Simulamos un éxito para mostrar el mensaje de éxito.
            Swal.fire({
                icon: "success",
                title: "Cita registrada",
                text: "La cita fue registrada exitosamente.",
                confirmButtonColor: "#3085d6",
            });

            setFormData(initialForm);
            await cargarDatos(); // Recargamos las citas

        } catch (error) {
            console.error("Error al registrar cita:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ocurrió un error al registrar la cita.",
            });
        }
    };

    const handleEditClick = async (id) => {
        // Aquí se debe manejar la edición de la cita, cargar la cita y permitir su modificación.
        try {
            // Ejemplo: const cita = await getCitaById(id);
            // setFormData({...cita});
            setOpen(true);
        } catch (error) {
            console.error("Error al cargar la cita:", error);
            Swal.fire("Error", "No se pudo cargar la cita", "error");
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esto eliminará la cita.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
            try {
                // Simulamos la eliminación de la cita, ajusta esto a tu lógica.
                // await deleteCita(id);
                await cargarDatos();
                Swal.fire({
                    icon: "success",
                    title: "Cita eliminada",
                    text: "La cita fue eliminada correctamente.",
                });
            } catch (error) {
                console.error("Error al eliminar la cita:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se pudo eliminar la cita.",
                });
            }
        }
    };

    return {
        open,
        abrirModalCitas,
        formData,
        citas,
        handleChange,
        handleSubmit,
        handleEditClick,
        handleDelete,
    };
};
