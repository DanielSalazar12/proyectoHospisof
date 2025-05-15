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

    const abrirModal = () => setOpen(true);

    const cerrarModal = () => {
        console.log("Cerrar modal llamado");
        setOpen(false);
        setFormData(initialForm);
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const cargarDatos = async () => {
        try {
            const citasData = await fetchCitas();
            setCitas(citasData);
        } catch (error) {
            console.error("Error al cargar citas:", error);
        }
    };

    const getInitialDate = () => {
        if (!citas.length) return new Date().toISOString().split("T")[0];
        const fechas = citas.map((cita) => cita.fechaCita).sort();
        return fechas[0];
    };

    const handleEventClick = (info) => {
        const citaId = info.event.extendedProps.id;
        const citaSeleccionada = citas.find((cita) => cita._id === citaId);
        if (!citaSeleccionada) return;

        const fechaFormateada = citaSeleccionada.fechaCita.split("T")[0];

        setFormData({
            pacienteId:
                citaSeleccionada.pacienteId._id || citaSeleccionada.pacienteId || "",
            medicoId: citaSeleccionada.medicoId._id || citaSeleccionada.medicoId || "",
            fechaCita: fechaFormateada,
            horaCita: citaSeleccionada.horaCita || "",
            motivo: citaSeleccionada.motivo || "",
            notas: citaSeleccionada.notas || "",
            tipoConsulta: citaSeleccionada.tipoConsulta || "",
            fechaCreacion: citaSeleccionada.fechaCreacion || "",
        });

        abrirModal();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const camposRequeridos = [
            "pacienteId",
            "medicoId",
            "fechaCita",
            "horaCita",
            "motivo",
            "tipoConsulta",
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
            // Aquí podrías diferenciar entre crear o actualizar según formData tenga _id o no
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

            // await createCita(nuevaCita); // Descomenta para llamar tu API

            Swal.fire({
                icon: "success",
                title: "Cita registrada",
                text: "La cita fue registrada exitosamente.",
                confirmButtonColor: "#3085d6",
            });

            setFormData(initialForm);
            cerrarModal();
            await cargarDatos();
        } catch (error) {
            console.error("Error al registrar cita:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ocurrió un error al registrar la cita.",
            });
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

    useEffect(() => {
        cargarDatos();
    }, []);

    return {
        open,
        abrirModal,
        cerrarModal,
        formData,
        citas,
        cargarDatos,
        handleChange,
        handleEventClick,
        handleSubmit,
        handleDelete,
        getInitialDate,
    };
};
