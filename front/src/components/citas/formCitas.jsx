import { useState } from "react";
import Swal from "sweetalert2";

const ModalCita = ({ open, onClose }) => {
    const [formData, setFormData] = useState({
        pacienteId: "",
        medicoId: "",
        fechaCita: "",
        horaCita: "",
        motivo: "",
        notas: "",
        tipoConsulta: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        // Aquí va la lógica para guardar la cita, ya sea llamando a una API
        Swal.fire({
            icon: "success",
            title: "Cita registrada",
            text: "La cita se ha registrado correctamente.",
        });
        onClose(); // Cerrar el modal
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Registrar Cita</h2>
                <form onSubmit={handleSubmit}>
                    {/* Agregar campos de formulario aquí */}
                    <div className="mb-4">
                        <label htmlFor="pacienteId" className="block">Paciente</label>
                        <input
                            type="text"
                            name="pacienteId"
                            value={formData.pacienteId}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    {/* Agregar más campos de formulario... */}
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded text-white"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Registrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
